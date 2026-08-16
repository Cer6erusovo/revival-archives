// PROTOTYPE - NOT FOR PRODUCTION
// Hypothesis: A hybrid node model can deliver spatial presence without free movement.
// Formal Campaign story stops before Act 5; this prototype adds no canon.

const ui = {
  scene: document.querySelector("#scene"),
  world: document.querySelector("#world"),
  layer: document.querySelector("#interactiveLayer"),
  locationCode: document.querySelector("#locationCode"),
  locationName: document.querySelector("#locationName"),
  viewDirection: document.querySelector("#viewDirection"),
  viewName: document.querySelector("#viewName"),
  sceneTime: document.querySelector("#sceneTime"),
  sceneState: document.querySelector("#sceneState"),
  objective: document.querySelector("#objective"),
  transitionCaption: document.querySelector("#transitionCaption"),
  actionTitle: document.querySelector("#actionTitle"),
  actionDescription: document.querySelector("#actionDescription"),
  actionButtons: document.querySelector("#actionButtons"),
  eventIndex: document.querySelector("#eventIndex"),
  eventText: document.querySelector("#eventText"),
  flashlightToggle: document.querySelector("#flashlightToggle"),
  audioToggle: document.querySelector("#audioToggle"),
  notesToggle: document.querySelector("#notesToggle"),
  notesPanel: document.querySelector("#notesPanel"),
  notesClose: document.querySelector("#notesClose"),
  factList: document.querySelector("#factList"),
  hypothesisSection: document.querySelector("#hypothesisSection"),
  hypothesisResult: document.querySelector("#hypothesisResult"),
  lookLeft: document.querySelector("#lookLeft"),
  lookRight: document.querySelector("#lookRight"),
  resetButton: document.querySelector("#resetButton"),
  introDialog: document.querySelector("#introDialog"),
  enterPrototype: document.querySelector("#enterPrototype"),
  endDialog: document.querySelector("#endDialog"),
  endSummary: document.querySelector("#endSummary"),
  metricMoves: document.querySelector("#metricMoves"),
  metricFacts: document.querySelector("#metricFacts"),
  metricHypothesis: document.querySelector("#metricHypothesis"),
  metricEncounter: document.querySelector("#metricEncounter"),
  replayButton: document.querySelector("#replayButton"),
  closeEndButton: document.querySelector("#closeEndButton")
};

const initialState = () => ({
  node: "classroom",
  view: "forward",
  flashlight: true,
  audio: true,
  transitioning: false,
  stairVisits: 0,
  encounter: false,
  encounterObserved: false,
  resolved: false,
  hypothesis: null,
  encounterChoice: null,
  moves: 0,
  observations: 0,
  eventSequence: 0,
  facts: new Map(),
  observed: new Set()
});

let state = initialState();
let audioContext = null;
let ambientGain = null;
let ambientOscillator = null;
let lastFocusBeforeNotes = null;

const sceneData = {
  classroom: {
    code: "5F-C02",
    name: "五楼 · 教室后门",
    time: "20:12",
    directions: {
      forward: "西侧走廊",
      back: "教室内部"
    }
  },
  corridor: {
    code: "5F-W01",
    name: "五楼 · 西侧走廊",
    time: "20:14",
    directions: {
      west: "西楼梯方向",
      east: "回望教室"
    }
  },
  stair: {
    code: "ST-W-5",
    name: "西楼梯 · 上层平台",
    time: "20:17",
    directions: {
      landing: "向下",
      back: "回望队尾"
    }
  }
};

const viewOrder = {
  classroom: ["forward", "back"],
  corridor: ["west", "east"],
  stair: ["landing", "back"]
};

function corridorArchitecture(options) {
  const opts = options || {};
  const extra = opts.extra || "";
  return [
    '<div class="architecture">',
    '<div class="ceiling"></div>',
    '<div class="fluorescent"></div>',
    '<div class="corridor-back"></div>',
    '<div class="wall-left"></div>',
    '<div class="wall-right"></div>',
    '<div class="door-shape door-left"></div>',
    '<div class="door-shape door-right"></div>',
    '<div class="window-row"><i></i><i></i><i></i></div>',
    '<div class="notice-board"></div>',
    extra,
    "</div>"
  ].join("");
}

function stairArchitecture() {
  const figure = (state.encounter || state.resolved) && state.view === "back"
    ? '<div class="figure"></div>'
    : "";
  const signText = state.stairVisits > 0 ? "5F · WEST" : "5F · WEST";
  return [
    '<div class="architecture stair-architecture">',
    '<div class="stair-wall"></div>',
    '<div class="stair-void"></div>',
    '<div class="handrail"></div>',
    '<div class="fire-box"></div>',
    '<div class="landing-sign">', signText, "</div>",
    figure,
    "</div>"
  ].join("");
}

function classroomArchitecture() {
  return [
    '<div class="architecture classroom-architecture">',
    '<div class="ceiling"></div>',
    '<div class="fluorescent"></div>',
    '<div class="blackboard"></div>',
    '<div class="notice-board"></div>',
    '<div class="door-shape door-right"></div>',
    '<div class="desk-field"><i></i><i></i><i></i><i></i><i></i><i></i></div>',
    "</div>"
  ].join("");
}

function render() {
  const data = sceneData[state.node];
  const currentView = data.directions[state.view];

  ui.scene.dataset.node = state.node;
  ui.scene.dataset.view = state.view;
  ui.scene.className = "scene";
  if (!state.flashlight) ui.scene.classList.add("flashlight-off");
  if (state.node === "stair" && state.stairVisits > 0) ui.scene.classList.add("anomaly");
  if (state.encounter || state.resolved) ui.scene.classList.add("encounter");
  if (state.transitioning) ui.scene.classList.add("is-transitioning");

  ui.locationCode.textContent = data.code;
  ui.locationName.textContent = data.name;
  ui.viewDirection.textContent = "朝向：" + currentView;
  ui.viewName.textContent = currentView;
  ui.sceneTime.textContent = data.time;
  ui.sceneState.textContent = getSceneState();
  ui.objective.textContent = getObjective();

  if (state.node === "stair") {
    ui.world.innerHTML = stairArchitecture();
  } else if (state.node === "classroom" && state.view === "back") {
    ui.world.innerHTML = classroomArchitecture();
  } else {
    ui.world.innerHTML = corridorArchitecture();
  }

  renderInteractions();
  renderFacts();
  updateUtilityButtons();
}

function getSceneState() {
  if (state.resolved) return "状态：后果已成立";
  if (state.encounter) return "状态：异常逼近";
  if (state.node === "stair" && state.stairVisits > 0) return "空间：对应异常";
  return state.flashlight ? "照明：手电开启" : "照明：手电关闭";
}

function getObjective() {
  if (state.resolved) return "演示路径完成，可查看结果。";
  if (state.encounter && !state.encounterObserved) return "回望队尾，并确认正在接近的人。";
  if (state.encounterObserved) return "在撤离与保护之间作出一次现场选择。";
  if (state.hypothesis === "loop") return "用一次移动验证你的空间假设。";
  if (state.stairVisits > 0 && canFormHypothesis()) return "打开个人记录，形成空间假设。";
  if (state.stairVisits > 0) return "检查平台上的共同锚点，确认是否来过这里。";
  if (state.node === "stair") return "记住平台细节，再沿楼梯向下。";
  if (state.node === "corridor") return "观察走廊参照物，然后进入西楼梯。";
  return "先熟悉五楼空间，再前往西楼梯。";
}

function renderInteractions() {
  ui.layer.replaceChildren();

  if (state.node === "classroom") {
    renderClassroomInteractions();
  } else if (state.node === "corridor") {
    renderCorridorInteractions();
  } else {
    renderStairInteractions();
  }
}

function renderClassroomInteractions() {
  if (state.view === "forward") {
    addHotspot({
      id: "classroom-doorframe",
      label: "教室后门门框",
      position: { left: "35%", top: "34%", width: "8%", height: "39%" },
      title: "教室后门",
      description: "门已经打开。门框右侧有长期磕碰留下的浅色缺口。",
      actions: [
        action("记住门框缺口", () => observe(
          "classroom-doorframe",
          "doorframe-anchor",
          "教室后门右侧有一道浅色缺口，可以作为回望时的空间参照。",
          "你用手电沿门框扫过。右侧缺口的位置很固定，离地约一臂高。"
        ))
      ]
    });
    addExit({
      id: "exit-to-corridor",
      label: "走进五楼走廊",
      position: { left: "45%", top: "28%", width: "10%", height: "45%" },
      activate: () => moveTo("corridor", "west", "穿过教室后门")
    });
    addHotspot({
      id: "classroom-window",
      label: "窗上的微弱倒影",
      position: { left: "72%", top: "19%", width: "22%", height: "36%" },
      title: "走廊窗",
      description: "玻璃里能看见你身后的教室灯，也能看见走廊延伸方向。",
      actions: [
        action("调整手电观察倒影", () => observe(
          "classroom-window",
          "normal-reflection",
          "正常状态下，窗户能同时反射教室灯和走廊方向。",
          "倒影没有异常。教室灯在你身后，西楼梯方向在画面右侧。"
        ))
      ]
    });
  } else {
    addHotspot({
      id: "classroom-notice",
      label: "值日记录",
      position: { left: "4%", top: "23%", width: "18%", height: "26%" },
      title: "教室后墙",
      description: "纸张、桌椅和留在座位上的书包都处于普通晚自习状态。",
      actions: [
        action("确认这是正常教室", () => observe(
          "classroom-notice",
          "normal-classroom",
          "教室内部没有提前出现灵异预兆；灯、桌椅和人物痕迹都符合日常状态。",
          "你回头看了一遍。没有故障画面，也没有提前出现的恐怖提示。"
        ))
      ]
    });
  }
}

function renderCorridorInteractions() {
  if (state.view === "west") {
    addHotspot({
      id: "corridor-lamp",
      label: "走廊荧光灯",
      position: { left: "43%", top: "8%", width: "14%", height: "15%" },
      title: "走廊照明",
      description: "灯光能照清近处地砖，西楼梯门后仍然较暗。",
      actions: [
        action("观察光线边界", () => observe(
          "corridor-lamp",
          "corridor-light",
          "走廊灯能照亮近处地砖，但西楼梯门后的光线明显更弱。",
          "你没有把黑暗当成纯遮罩。光线边界本身就是空间信息。"
        ))
      ]
    });
    addHotspot({
      id: "corridor-floor",
      label: "地砖接缝",
      position: { left: "36%", top: "68%", width: "28%", height: "20%" },
      title: "走廊地面",
      description: "地砖接缝朝西楼梯方向收束，可以帮助确认移动朝向。",
      actions: [
        action("沿接缝确认方向", () => observe(
          "corridor-floor",
          "corridor-direction",
          "五楼地砖接缝朝西楼梯方向收束，正常移动方向可以被视觉参照确认。",
          "你顺着地砖接缝看过去。西楼梯就在走廊尽头，不需要地图箭头替你解释。"
        ))
      ]
    });
    addExit({
      id: "exit-to-stair",
      label: "进入西楼梯",
      position: { left: "43%", top: "30%", width: "14%", height: "42%" },
      activate: () => moveTo("stair", "landing", "推开西楼梯门")
    });
  } else {
    addExit({
      id: "exit-to-classroom",
      label: "返回教室后门",
      position: { left: "43%", top: "30%", width: "14%", height: "42%" },
      activate: () => moveTo("classroom", "forward", "沿原路返回教室")
    });
    addHotspot({
      id: "corridor-return-anchor",
      label: "后门门框缺口",
      position: { left: "51%", top: "42%", width: "8%", height: "24%" },
      title: "回望教室",
      description: "从走廊仍能看见后门门框右侧的浅色缺口。",
      actions: [
        action("对照刚才的门框", () => {
          const detail = state.facts.has("doorframe-anchor")
            ? "缺口位置与刚才一致。节点切换没有抹掉你主动记住的参照。"
            : "你看见门框上的缺口，但此前没有主动记录它。";
          observe("corridor-return-anchor", "return-view", "从走廊回望时，教室后门仍保持可辨认的空间关系。", detail);
        })
      ]
    });
  }
}

function renderStairInteractions() {
  if (state.view === "landing") {
    addHotspot({
      id: "stair-firebox",
      label: "消防栓玻璃裂纹",
      position: { left: "10%", top: "21%", width: "17%", height: "32%" },
      title: "消防栓",
      description: state.stairVisits > 0
        ? "同样的斜裂纹又出现在左下角。灰尘厚度和反光位置也没有改变。"
        : "玻璃左下角有一条斜裂纹，柜门内侧积着一层灰。",
      actions: [
        action("贴近检查裂纹", () => inspectFirebox())
      ]
    });
    addHotspot({
      id: "stair-sign",
      label: "楼层方向牌",
      position: { left: "71%", top: "10%", width: "18%", height: "18%" },
      title: "楼层方向牌",
      description: state.stairVisits > 0
        ? "方向牌仍写着 5F · WEST，右侧边缘缺了一小块漆。"
        : "方向牌写着 5F · WEST，右侧边缘缺了一小块漆。",
      actions: [
        action("记住缺漆位置", () => inspectSign())
      ]
    });
    addHotspot({
      id: "stair-rail",
      label: "冰冷扶手",
      position: { left: "30%", top: "49%", width: "55%", height: "23%" },
      title: "楼梯扶手",
      description: "扶手通向更暗的下层。手电只能照见最近一段台阶。",
      actions: [
        action("沿扶手照向下层", () => setEvent(
          "手电光顺着扶手滑下去，在下一个转角前被黑暗截断。你无法看清更远楼层。",
          "OBS"
        ))
      ]
    });

    if (!state.encounter) {
      addExit({
        id: "exit-stair-down",
        label: state.hypothesis === "loop" ? "再次向下，验证空间假设" : "沿楼梯向下",
        position: { left: "62%", top: "53%", width: "28%", height: "35%" },
        activate: () => descendStair()
      });
    }

    if (state.stairVisits === 0 && !state.encounter) {
      addExit({
        id: "exit-stair-up",
        label: "返回五楼走廊",
        position: { left: "4%", top: "56%", width: "22%", height: "31%" },
        activate: () => moveTo("corridor", "west", "返回五楼走廊")
      });
    }
  } else {
    if (state.encounter || state.resolved) {
      addHotspot({
        id: "tail-figure",
        label: state.encounterObserved ? "正在靠近的异常同学" : "队尾多出来的人",
        position: { left: "43%", top: "26%", width: "18%", height: "50%" },
        title: "队尾异常",
        description: state.encounterObserved
          ? "它没有正常呼吸，脚步与身体移动也不同步。"
          : "校服轮廓看起来普通，但你不记得它什么时候进入队伍。",
        actions: state.encounterObserved
          ? encounterActions()
          : [
              action("把手电照向它", () => revealEncounter(), "danger-action"),
              action("先向其他人示警", () => revealEncounter(), "danger-action")
            ]
      });
    } else {
      addHotspot({
        id: "stair-back-space",
        label: "身后的楼梯平台",
        position: { left: "39%", top: "26%", width: "24%", height: "48%" },
        title: "回望平台",
        description: "身后暂时没有异常人物。消防栓和方向牌仍处在原位置。",
        actions: [
          action("确认队尾和退路", () => observe(
            "stair-back-space",
            "stair-back-clear",
            "第一次进入西楼梯时，队尾与回程方向仍然清楚。",
            "你回头确认了退路。此刻还没有多出来的人。"
          ))
        ]
      });
    }
  }
}

function action(label, run, className) {
  return { label, run, className: className || "" };
}

function addHotspot(config) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "hotspot";
  button.dataset.label = config.label;
  button.setAttribute("aria-label", config.label);
  Object.assign(button.style, config.position);
  if (state.observed.has(config.id)) button.classList.add("is-observed");
  button.addEventListener("click", () => selectInteraction(config, button));
  ui.layer.append(button);
}

function addExit(config) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "exit-hotspot";
  button.dataset.label = config.label;
  button.setAttribute("aria-label", config.label);
  Object.assign(button.style, config.position);
  button.addEventListener("click", config.activate);
  ui.layer.append(button);
}

function selectInteraction(config, sourceButton) {
  ui.actionTitle.textContent = config.title;
  ui.actionDescription.textContent = config.description;
  ui.actionButtons.replaceChildren();
  config.actions.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = item.label;
    if (item.className) button.classList.add(item.className);
    button.addEventListener("click", () => {
      item.run();
      sourceButton.classList.add("is-observed");
    });
    ui.actionButtons.append(button);
  });
  ui.actionButtons.querySelector("button")?.focus();
}

function resetActionDeck(title, description) {
  ui.actionTitle.textContent = title;
  ui.actionDescription.textContent = description;
  ui.actionButtons.innerHTML = '<span class="action-placeholder">选择场景中的物体或出口</span>';
}

function observe(hotspotId, factId, factText, eventText) {
  state.observed.add(hotspotId);
  if (!state.facts.has(factId)) {
    state.facts.set(factId, factText);
    state.observations += 1;
  }
  setEvent(eventText, "OBS");
  checkHypothesisUnlock();
  render();
}

function inspectFirebox() {
  if (state.stairVisits === 0) {
    observe(
      "stair-firebox",
      "firebox-first",
      "第一次到达平台时，消防栓玻璃左下角有一条斜裂纹，灰尘和反光位置固定。",
      "你记住了裂纹的分叉、灰尘边缘和手电反光位置。"
    );
  } else {
    observe(
      "stair-firebox",
      "firebox-repeat",
      "向下移动后，消防栓裂纹、灰尘和反光仍处于完全相同的位置。",
      "不是相似。连裂纹最细的分叉都没有变化。你像是回到了同一个平台。"
    );
  }
}

function inspectSign() {
  if (state.stairVisits === 0) {
    observe(
      "stair-sign",
      "sign-first",
      "第一次到达平台时，5F · WEST 方向牌右侧缺了一小块漆。",
      "你用手电照过方向牌。缺漆位于右侧下沿。"
    );
  } else {
    observe(
      "stair-sign",
      "sign-repeat",
      "向下移动后，方向牌仍写着 5F · WEST，缺漆位置也完全相同。",
      "楼层文字和缺漆都没有改变。单纯用“每层很像”已经解释不通。"
    );
  }
}

function canFormHypothesis() {
  const fireboxPair = state.facts.has("firebox-first") && state.facts.has("firebox-repeat");
  const signPair = state.facts.has("sign-first") && state.facts.has("sign-repeat");
  return fireboxPair || signPair;
}

function checkHypothesisUnlock() {
  if (canFormHypothesis() && !state.hypothesis) {
    ui.hypothesisSection.hidden = false;
    setEvent("你已经拥有一组前后可比较的空间事实。个人记录中可以形成假设。", "SYS");
  }
}

function descendStair() {
  if (state.transitioning) return;
  if (state.hypothesis === "loop") {
    startTransition("沿楼梯继续向下", () => {
      state.moves += 1;
      state.encounter = true;
      state.view = "back";
      setEvent("移动结束时，你仍站在同一平台。队伍末尾却多出了一道校服轮廓。", "THR");
      cueAudio(78, 0.5, 0.07);
    });
    return;
  }

  startTransition("沿扶手向下移动", () => {
    state.moves += 1;
    state.stairVisits += 1;
    state.view = "landing";
    setEvent(
      state.stairVisits === 1
        ? "你确实走完了一段楼梯，但前方平台的布局让人产生不舒服的熟悉感。"
        : "又一段楼梯结束。方向牌和消防栓仍在原来的相对位置。",
      "MOV"
    );
    cueAudio(52, 0.35, 0.04);
  });
}

function revealEncounter() {
  state.encounterObserved = true;
  state.observed.add("tail-figure");
  if (!state.facts.has("tail-figure")) {
    state.facts.set(
      "tail-figure",
      "队尾多出的校服人物没有正常呼吸，脚步与身体移动不同步。"
    );
    state.observations += 1;
  }
  setEvent("手电扫过它的脸。皮肤没有随呼吸起伏，它却已经比刚才更靠近。", "THR");
  cueAudio(43, 0.7, 0.09);
  render();
  selectEncounterActions();
}

function encounterActions() {
  return [
    action("示警并向上撤离", () => resolveEncounter("撤离"), "danger-action"),
    action("拉住最近的同学", () => resolveEncounter("保护"), "danger-action"),
    action("保持距离继续观察", () => resolveEncounter("观察"), "danger-action")
  ];
}

function selectEncounterActions() {
  ui.actionTitle.textContent = "异常正在逼近";
  ui.actionDescription.textContent = "这里没有攻击键。你只能在位置、人物和信息之间作出一次现场选择。";
  ui.actionButtons.replaceChildren();
  encounterActions().forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = item.label;
    button.className = item.className;
    button.addEventListener("click", item.run);
    ui.actionButtons.append(button);
  });
  ui.actionButtons.querySelector("button")?.focus();
}

function resolveEncounter(choice) {
  state.resolved = true;
  state.encounterChoice = choice;
  let message = "";
  if (choice === "撤离") {
    message = "你先喊出队尾异常，队伍转身向上。没有伤害数字，只有原本拥挤的位置迅速空开。";
  } else if (choice === "保护") {
    message = "你抓住最近的人向上拉。队形因此改变，异常人物从你刚才站的位置穿了过去。";
  } else {
    message = "你没有靠近。它每次移动都比脚步声提前半拍，这条事实被保留下来，但距离也被消耗。";
  }
  setEvent(message, "CON");
  cueAudio(34, 0.85, 0.06);
  render();
  window.setTimeout(showEndDialog, prefersReducedMotion() ? 0 : 700);
}

function moveTo(node, view, caption) {
  if (state.transitioning) return;
  startTransition(caption, () => {
    state.node = node;
    state.view = view;
    state.moves += 1;
    setEvent("位置已更新：" + sceneData[node].name + "。你仍可回望上一段路线。", "MOV");
    cueAudio(92, 0.16, 0.025);
  });
}

function startTransition(caption, commit) {
  state.transitioning = true;
  ui.transitionCaption.textContent = caption;
  ui.transitionCaption.setAttribute("aria-hidden", "false");
  render();

  const delay = prefersReducedMotion() ? 20 : 430;
  window.setTimeout(() => {
    commit();
    state.transitioning = false;
    ui.transitionCaption.setAttribute("aria-hidden", "true");
    resetActionDeck("到达新的观察位置", "先确认朝向，再选择场景中的物体或出口。");
    render();
    ui.scene.focus({ preventScroll: true });
  }, delay);
}

function rotateView(direction) {
  if (state.transitioning) return;
  const order = viewOrder[state.node];
  const current = order.indexOf(state.view);
  const next = direction === "left"
    ? (current - 1 + order.length) % order.length
    : (current + 1) % order.length;
  state.view = order[next];
  setEvent("你没有离开当前位置，只改变了观察方向。", "VIEW");
  resetActionDeck("改变观察方向", "节点状态、人物位置和已观察物体都被保留。");
  render();
}

function setEvent(text, prefix) {
  state.eventSequence += 1;
  ui.eventIndex.textContent = String(prefix || "OBS") + "-" + String(state.eventSequence).padStart(3, "0");
  ui.eventText.textContent = text;
}

function renderFacts() {
  ui.factList.replaceChildren();
  if (state.facts.size === 0) {
    const empty = document.createElement("li");
    empty.className = "fact-empty";
    empty.textContent = "尚未主动确认任何事实。";
    ui.factList.append(empty);
  } else {
    state.facts.forEach((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      ui.factList.append(item);
    });
  }
  ui.hypothesisSection.hidden = !canFormHypothesis() || Boolean(state.hypothesis);
}

function openNotes() {
  lastFocusBeforeNotes = document.activeElement;
  ui.notesPanel.classList.add("is-open");
  ui.notesPanel.setAttribute("aria-hidden", "false");
  ui.notesToggle.setAttribute("aria-expanded", "true");
  ui.notesClose.focus();
}

function closeNotes() {
  ui.notesPanel.classList.remove("is-open");
  ui.notesPanel.setAttribute("aria-hidden", "true");
  ui.notesToggle.setAttribute("aria-expanded", "false");
  if (lastFocusBeforeNotes instanceof HTMLElement) {
    lastFocusBeforeNotes.focus();
  }
}

function submitHypothesis(value) {
  if (value !== "loop") {
    ui.hypothesisResult.textContent = value === "lost"
      ? "不能解释裂纹与缺漆都处在完全相同的位置。"
      : "相似楼层不能解释方向牌始终写着同一个楼层。";
    setEvent("这个假设无法同时解释你主动确认的空间锚点。", "HYP");
    return;
  }
  state.hypothesis = "loop";
  ui.hypothesisResult.textContent = "假设可行动：移动发生了，但出口关系把你送回同一段空间。";
  setEvent("假设成立到足以验证的程度。你仍需要用下一次移动承担风险。", "HYP");
  renderFacts();
  window.setTimeout(closeNotes, prefersReducedMotion() ? 0 : 500);
  render();
}

function updateUtilityButtons() {
  ui.flashlightToggle.setAttribute("aria-pressed", String(state.flashlight));
  ui.flashlightToggle.lastChild.textContent = state.flashlight ? " 手电开启" : " 手电关闭";
  ui.audioToggle.setAttribute("aria-pressed", String(state.audio));
  ui.audioToggle.lastChild.textContent = state.audio ? " 声音开启" : " 声音静音";
}

function toggleFlashlight() {
  state.flashlight = !state.flashlight;
  setEvent(state.flashlight ? "手电重新照亮近处场景。" : "你关闭手电。必要出口仍保留可访问标记。", "SYS");
  render();
}

function setupAudio() {
  if (audioContext) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    state.audio = false;
    updateUtilityButtons();
    return;
  }
  audioContext = new AudioCtx();
  ambientGain = audioContext.createGain();
  ambientGain.gain.value = 0.018;
  ambientGain.connect(audioContext.destination);
  ambientOscillator = audioContext.createOscillator();
  ambientOscillator.type = "sine";
  ambientOscillator.frequency.value = 58;
  ambientOscillator.connect(ambientGain);
  ambientOscillator.start();
}

function toggleAudio() {
  setupAudio();
  state.audio = !state.audio;
  if (ambientGain && audioContext) {
    ambientGain.gain.setTargetAtTime(state.audio ? 0.018 : 0, audioContext.currentTime, 0.03);
  }
  setEvent(state.audio ? "环境声音已开启。" : "声音已静音；关键声音仍会显示空间提示。", "SYS");
  updateUtilityButtons();
}

function cueAudio(frequency, duration, gainValue) {
  if (!state.audio || !audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(gainValue, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function showEndDialog() {
  ui.endSummary.textContent = state.encounterChoice === "保护"
    ? "你通过空间位置而不是攻击数值处理了遭遇，并保留了主动观察形成的事实。"
    : "你完成了节点移动、空间验证和无血条遭遇；结果由位置与行动直接呈现。";
  ui.metricMoves.textContent = String(state.moves);
  ui.metricFacts.textContent = String(state.facts.size);
  ui.metricHypothesis.textContent = state.hypothesis === "loop" ? "空间出口重复" : "未形成";
  ui.metricEncounter.textContent = state.encounterChoice || "—";
  ui.endDialog.showModal();
}

function resetPrototype(showIntro) {
  const audioWasOn = state.audio;
  if (ui.endDialog.open) ui.endDialog.close();
  closeNotes();
  state = initialState();
  state.audio = audioWasOn;
  if (ambientGain && audioContext) {
    ambientGain.gain.setTargetAtTime(state.audio ? 0.018 : 0, audioContext.currentTime, 0.03);
  }
  ui.hypothesisResult.textContent = "";
  resetActionDeck("站在教室后门", "手电光落在门框和走廊地砖上。场景中的方形标记可以直接交互。");
  ui.eventIndex.textContent = "OBS-000";
  ui.eventText.textContent = "这是交互模型演示，不是正式剧情。先观察，再移动。";
  render();
  if (showIntro && !ui.introDialog.open) ui.introDialog.showModal();
}

ui.lookLeft.addEventListener("click", () => rotateView("left"));
ui.lookRight.addEventListener("click", () => rotateView("right"));
ui.flashlightToggle.addEventListener("click", toggleFlashlight);
ui.audioToggle.addEventListener("click", toggleAudio);
ui.notesToggle.addEventListener("click", () => {
  if (ui.notesPanel.classList.contains("is-open")) closeNotes();
  else openNotes();
});
ui.notesClose.addEventListener("click", closeNotes);
ui.resetButton.addEventListener("click", () => resetPrototype(true));
ui.replayButton.addEventListener("click", () => resetPrototype(false));
ui.closeEndButton.addEventListener("click", () => ui.endDialog.close());
ui.enterPrototype.addEventListener("click", () => {
  setupAudio();
  ui.introDialog.close();
  ui.scene.focus();
});

document.querySelectorAll("[data-hypothesis]").forEach((button) => {
  button.addEventListener("click", () => submitHypothesis(button.dataset.hypothesis));
});

ui.scene.addEventListener("pointermove", (event) => {
  const rect = ui.scene.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  ui.scene.style.setProperty("--light-x", Math.max(8, Math.min(92, x)) + "%");
  ui.scene.style.setProperty("--light-y", Math.max(12, Math.min(88, y)) + "%");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && ui.notesPanel.classList.contains("is-open")) {
    event.preventDefault();
    closeNotes();
    return;
  }
  if (ui.introDialog.open || ui.endDialog.open) return;
  const tag = document.activeElement?.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    rotateView("left");
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    rotateView("right");
  } else if (event.key.toLowerCase() === "f") {
    event.preventDefault();
    toggleFlashlight();
  } else if (event.key.toLowerCase() === "m") {
    event.preventDefault();
    toggleAudio();
  } else if (event.key.toLowerCase() === "n") {
    event.preventDefault();
    if (ui.notesPanel.classList.contains("is-open")) closeNotes();
    else openNotes();
  }
});

resetPrototype(false);
ui.introDialog.showModal();
