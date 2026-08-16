# System GDD: Spatial Scene Exploration

> Status: APPROVED — lean formal review 2026-08-17; interaction model A locked by user
>
> Created: 2026-08-17
>
> Corrected: 2026-08-17 — technical spike separated from experience validation
>
> System map ID: 5
>
> Scope: Formal Campaign only

## 1. Overview

Spatial Scene Exploration 使用“混合节点式”交互模型：世界由可返回、可记忆的空间节点组成；每个节点内部提供有限转向、手电照明、局部观察、物体近看和直接动作。玩家通过场景中的真实出口移动，而不是从卡片列表选择下一页。系统需要在个人 Web 项目可控范围内提供足够的空间感、动画和恐怖反馈。

本系统不提供自由 WASD 行走、碰撞地图或即时射击，也不允许退化为静态插图加正文按钮。

## 2. Player Fantasy

玩家应感到自己真的站在七中的教室、走廊和楼梯中：知道身后是什么、刚从哪里来、哪个物体发生了改变，也能在空间规律失常时凭自己的记忆指出异常。

移动不是装饰性换页。选择朝向、照向哪里、靠近什么以及是否回头，都可能产生事实、风险或人物后果。

## Game Feel

### Feel target

空间探索应当是“反应及时，但行动有分量”。玩家改变视线时界面必须立即回应；真正跨过门、进入走廊或踏上楼梯时，则需要一个短促但明确的空间承诺。整体节奏是观察、行动、停下来确认，而不是持续点按或追求操作速度。

### Responsiveness profile

| Interaction | Startup | Active feedback | Recovery / settle | Intended weight |
|---|---:|---:|---:|---|
| Hotspot focus / hover | 0–60 ms | 120–180 ms | 0–80 ms | 轻；只确认“这里可观察” |
| Viewpoint turn | 0–80 ms | 120–220 ms | ≤300 ms total | 中；保持所在 node 不变 |
| Close view | 0–60 ms | 120–220 ms | ≤220 ms | 轻到中；像主动靠近物体 |
| Node movement | 0–100 ms | 300–700 ms | 新场景稳定后才开放 command | 重；表示真实跨过一个空间边界 |
| Confirmed anomaly | command 后立即成立 | 一次局部光、位置或声音断层 | 300–900 ms 后稳定可读 | 冷硬；不使用庆祝反馈 |

输入成功必须在 100 ms 内出现视觉、声音或文字中的至少一种确认；command 的规则结果不等待动画完成才计算。重复输入在 pending 期间只反馈“正在行动”，不得叠加移动。

### Tension cadence

- 正常空间允许玩家停留和建立记忆，不持续播放恐怖动效或音乐预警；
- 异常先破坏一个可指出的事实，再让玩家决定是否靠近或验证；
- 紧张段采用“短促行动 → 稳定构图 → 玩家观察”的循环，必要线索不会在自动倒计时中消失；
- 规则被证实时只让一个局部关系恢复清晰，其他空间继续保持威胁；
- 失败或人物后果先保留最后可见原因，再进入复盘，不用大字、红闪或胜负音效覆盖现场。

### Impact language

- 手电只改变当前可见范围和材质细节，不把所有 hotspot 变成发光按钮；
- 空间错位通过共同锚点、构图接缝、人物缺席或声音距离体现，不依赖全屏 glitch；
- 灵异存在的重量来自错误的静止、位置连续性或环境反馈，而不是受击、血条和屏幕震动；
- pointer 与 keyboard 的结果强度一致，键盘路径不能变成低反馈的替代模式；
- reduced motion 保留同样的状态边界、构图和音画信息，只取消位移、抖动和长过渡。

## 3. Detailed Rules

### 3.1 Spatial vocabulary

- Location node：一个可稳定站立或停留的位置，例如教室门口、走廊转角、楼梯平台。
- Viewpoint：同一 node 内的有限观察方向，例如前方、左侧、右侧、回望。
- Exit：场景中具有物理位置的移动目标，连接到另一个 node 或特殊 route resolver。
- Hotspot：当前 viewpoint 中可被观察或操作的人、物体和空间细节。
- Close view：仍属于当前 node 的局部近看层，关闭后返回原 viewpoint。
- Variant：同一 node 在正常、鬼域、后果发生后等状态下的视觉和交互差异。

### 3.2 Node movement

1. 玩家在场景中识别门、楼梯、走廊方向等 exit；
2. pointer 点击 exit，或 keyboard 聚焦后确认；
3. 系统提交 move command；
4. 规则验证 route 与前置条件；
5. 成功后播放受控移动过渡；
6. 新 node 稳定呈现，再开放下一次 command。

退出方向必须具有空间含义。UI 可以显示动作文字“走向西楼梯”，但不能用脱离场景的“下一页”替代出口。

### 3.3 Orientation and looking

- 每个 node 至少提供一个主 viewpoint；需要空间判断的 node 提供 2–4 个离散 viewpoint。
- pointer 可以在安全范围内轻微移动视线或手电；keyboard 使用明确的“向左看、向右看、回头”动作达到相同信息。
- viewpoint 切换保留 node identity、人物位置和已改变物体。
- 回望应尽量显示上一个 exit 或共同空间锚点，帮助玩家建立方向。
- 不用无限平滑旋转制造伪自由移动；视线边界必须与已制作场景资产一致。

### 3.4 Direct interaction

- Hotspot 直接位于物体在场景中的位置。
- 聚焦或选择 hotspot 后，只显示该对象当前成立的 1–4 个语义动作，例如“照向”“贴近听”“查看裂纹”“打开”。
- 动作反馈优先发生在原场景：光线、局部动画、人物位置、声音或物体状态改变。
- 需要阅读的长文本进入独立阅读层，但不能替代场景中的发现动作。
- Observation fact 只在玩家实际完成对应观察后产生；进入 node 不自动收集全部线索。

### 3.5 Spatial anomaly and puzzle behavior

- 鬼域可以改变 exit 对应、node variant、可见距离和声音方向，但不随意删除所有正常参照。
- 每个需要玩家识别的空间异常至少保留一个可比较锚点，例如扶手缺口、消防栓裂纹、门窗相对位置或人物声音。
- 重复楼梯可让多个 move command 返回同一 node identity 的不同 visit state，Presentation 通过锚点重复和细微变化使其可察觉。
- 系统只记录观察事实，不自动宣布“空间循环”；假设和规律确认由 Investigation & Rule Reasoning 负责。
- 反向移动、回头、保持参照或让人物分处两个节点，都可以成为验证动作，但必须由具体内容定义。

### 3.6 Confrontation behavior

- 灵异遭遇不切换到血条战斗界面。
- 威胁占据某个 node、viewpoint、exit 或 actor relation，并通过位置、动作和声音表现。
- 玩家可以观察、示警、撤离、保护人物、操作环境或使用未来已定义的灵异能力。
- 每个 committed action 都交给 State 与 Consequence 解析；Presentation 只表现已经成立的后果。
- 即时压力可以通过逐步逼近、出口关闭、人物位置变化或受控倒计时实现，但不得让必要推理被不可访问的反应速度取代。
- 未来若出现人类武装冲突，本系统只支持节点式战术选择和短演出，不支持自由瞄准射击。

### 3.7 Screen composition

- Desktop 主视区由场景占据，目标不低于可用 viewport 面积的 60%。
- 地点、当前可感知状态和少量动作位于边缘，不形成左右两排永久卡片。
- 手机、记录和设置作为可打开的辅助层；关闭后返回同一 node/viewpoint。
- 已确认事实可以进入记录层，未观察信息不能因 UI 预加载而暴露。

### 3.8 Technical spike evidence and boundary

`prototypes/campaign-spatial-a/` 是一次已经完成的功能技术 Spike，只提供以下证据：

1. Normal route：教室门口 → 五楼走廊 → 西楼梯平台，可前进、回望、转向、照明和检查物体；
2. Anomaly route：同一楼梯节点发生出口重复，玩家通过共同锚点识别异常；
3. Confrontation beat：队尾异常人物逼近，玩家能观察、示警、保护或撤离，结果通过位置状态表现；
4. 不出现第一只鬼、Act 5、白月光结局或正式存档迁移；
5. Spike 保存在 `prototypes/`，不得复制进当前 `src/`。

该 Spike 使用占位构图和硬编码内容，不能验证 Player Fantasy、Game Feel、恐怖氛围、美术可信度、动画重量或声音空间。它不是 Concept Prototype 或 Vertical Slice 的阶段门禁，不要求用户据此给出体验结论。

## 4. Formulas

### 4.1 Reachability

Reachable(A, B) = true，当且仅当当前 route graph 中存在从 node A 到 node B 的有效 exit path。

- normal route 要求设计目标内的往返路径可达；
- anomaly route 可以有 intentional one-way edge 或 loop，但必须由内容标记；
- example：Corridor → Stair Landing → Stair Turn → Stair Landing 构成有意循环，不是 graph validation error。

### 4.2 Viewpoint coverage

Coverage(node) = ReachableRequiredHotspots / RequiredHotspots。

- range：0.0–1.0；
- playable requirement：1.0；
- required hotspot 必须从至少一个 keyboard-reachable viewpoint 被发现；
- example：node 有 4 个必要 hotspot，只有 3 个 viewpoint 可达，则 coverage = 0.75，FAIL。

### 4.3 Spatial anchor requirement

ComparableAnchorCount ≥ 1，适用于每个要求玩家比较 normal/anomaly 或 first-visit/repeat-visit 的谜题。

核心空间谜题建议 2–3 个不同感官锚点，safe range 1–4；过多会让答案显而易见，0 个会变成猜测。

### 4.4 Interaction density

MeaningfulHotspotsPerView 的首版目标为 3–7，safe range 1–9。

这里统计具有观察或行动价值的对象，不包括纯装饰。超过 9 个时应拆分 viewpoint 或合并无意义热点。

### 4.5 Motion duration

- viewpoint change：120–300 ms；
- node transition：300–700 ms；
- close view：120–220 ms；
- reduced-motion replacement：0–100 ms。

过渡时长只影响 Presentation，不影响 command resolve 或威胁规则。

## 5. Edge Cases

- Exit blocked after viewpoint opens：退出动作更新为具体原因，不保留可点击幽灵热点。
- Player activates twice during transition：第二次 command 被拒绝或排队为 0，不能跳过 node。
- Backtracking into changed scene：返回相同 node identity 的新 variant，保留已发生后果。
- Intentional loop：event history 记录 visit count，但 UI 不直接显示隐藏计数。
- Close view while danger advances：内容必须明确 danger 是暂停、继续还是在 command 提交后推进；不能由 overlay 偶然决定。
- Required clue outside pointer reach：keyboard action 和 alternative focus path 必须仍可达到。
- Audio muted：声音方向提供不泄底的字幕/空间提示。
- Reduced motion：直接切换稳定构图，保留方向文字和状态变化。
- Very dark scene：必要 exit、focus 和近处锚点保持可辨；黑暗不能遮掉交互语义。
- Missing media：使用结构化 fallback 场景和文字动作，核心 route 仍可测试。
- Viewport narrower than desktop target：允许辅助层折叠，但 scene、exit 和当前动作不能水平锁死。

## 6. Dependencies

| Dependency | This system needs | Other system needs from this |
|---|---|---|
| Campaign State & Event | Node/viewpoint state, atomic move/look/action commands | Spatial commands and events |
| Scene & Content Registry | Nodes, exits, variants, hotspots, asset references | Spatial schema and validation rules |
| Input/Accessibility | Pointer, keyboard, focus, motion contracts | Concrete spatial focus order and commands |
| Persistence | Stable checkpoint locations | Serializable node/viewpoint identity |
| Investigation | Fact and validation interfaces | Observation actions and spatial evidence |
| Consequence | Threat and outcome events | Position, action and exit context |
| Narrative | Actor presence and dialogue triggers | Spatial actor placement and movement |
| Field UI | Scene renderer and overlays | View model, commands and transition events |
| Audio | Directional/ambient cue interface | Current node, viewpoint and event context |

## 7. Tuning Knobs

| Knob | Default | Safe range | Effect |
|---|---|---|---|
| Viewpoints per node | 2 | 1–4 | Spatial awareness vs. asset workload |
| Meaningful hotspots per view | 5 | 3–7 target | Investigation density |
| Comparable anchors per anomaly | 2 | 1–4 | Puzzle readability |
| Node transition duration | 450 ms | 300–700 ms | Presence vs. pace |
| Viewpoint transition duration | 180 ms | 120–300 ms | Responsiveness |
| Scene viewport share | 70% | 60–85% | Immersion vs. supporting UI |
| Exit label visibility | On focus + persistent when critical | Content-defined | Readability without visual clutter |

自由移动、血条战斗、纯卡片导航和 first-ghost ability 不是 tuning options。

## Visual / Audio Requirements

### Visual

- 正式场景首先需要一套可信、可记忆的中国普通校园资产：门窗比例、楼梯段、教室编号、瓷砖接缝和生活痕迹必须能建立正常空间；
- 正常、晚自习、鬼域和后果 variant 共用同一空间骨架，通过局部光线、远端缺失、物件状态和人物位置显示变化；
- 每个需要识别的异常至少保留一个跨 variant 一致的构图锚点；
- 热点依靠轮廓、留白、焦点边界或局部照明可辨，不给所有可交互物统一发光描边；
- 代表性体验验收必须等到 Pre-Production Vertical Slice；占位几何只能用于 route、focus 和 state 验证。

### Audio

- 每个 node 可定义环境底层、位置性声音和短反馈声；空间声音响应当前 node/viewpoint，而不是只按页面播放；
- 关键声音线索必须有不泄露答案的非听觉备份，例如方向文字、人物反应或局部视觉变化；
- 正常阶段不提前使用持续恐怖音乐；异常优先改变距离、方向、遮挡或重复关系；
- 浏览器未授权 audio、静音或加载失败时，所有必要路线和推理仍然成立；
- 具体混音、素材清单和加载策略由未来 Audio & Atmosphere GDD 拥有，本系统只提供空间上下文。

## UI Requirements

- desktop 中 scene 目标占可用 viewport 的 60–85%，地点、感知状态和当前动作退居边缘；
- exit 和 hotspot 绑定场景内物理位置，焦点或选择后才显示 1–4 个语义动作；
- viewpoint controls 明确写出方向或回望对象，不使用只有图标的罗盘猜谜；
- 手机、个人记录、长文本与设置使用临时辅助层，关闭后恢复原 node/viewpoint 和合理焦点；
- UI 不自动公布隐藏 route、visit count、威胁倒计时或未观察事实；
- 200% zoom、390 CSS px 宽度、keyboard-only、mute 和 reduced motion 下保留核心路径。

## 8. Acceptance Criteria

- 玩家可用 pointer 或 keyboard 完成至少 3 个 node 的前进、回望和返回路线。
- 每个移动 exit 在场景中有物理位置、方向与语义标签，不使用通用“下一页”作为核心导航。
- 同一 node 内至少演示转向、手电/视线移动和一个原地状态变化。
- 玩家必须主动观察才能获得 fact；单纯进入 node 不自动收集全部线索。
- anomaly route 至少使用一个共同锚点，让玩家能够指出重复或错位发生在哪里。
- confrontation 不显示 HP、damage number 或攻击技能栏，结果由位置和行动表现。
- 场景保持主视觉区域，辅助 UI 不退化为永久卡片墙。
- reduced motion、mute 和 keyboard-only 条件下仍可完成完整实现路径。
- 快速重复点击不会跳过 node、重复 consequence 或破坏 state。
- 系统验证切片不包含第一只鬼、Act 5 或 Prototype legacy 能力。
- 60 fps 动效预算内没有持续 JavaScript animation loop；静态状态不消耗循环更新。

## Open Questions

- 正式场景使用 DOM 分层、Canvas/WebGL 还是混合渲染，由 Phase 3 architecture 决定；本 GDD 不预选实现技术；
- 正常校园、鬼域 variant、人物局部和环境音的代表性资产生产方式与成本，要在 Pre-Production 前形成资产规格；
- 玩家能否在 3–5 分钟代表性 Vertical Slice 中无指导建立空间、指出异常并承担一次验证风险，留给 Vertical Slice playtest；
- Investigation & Rule Reasoning 将如何把 observation fact 变成可操作假设，是下一个 system GDD 的职责；
- Audio & Atmosphere 将如何定义方向声、距离变化和非听觉备份的统一 schema，尚未设计。

## Review Result

APPROVED：八个必需章节、Game Feel、Visual/Audio、UI 和 Open Questions 完整；规则、公式、边界和上游依赖可实现。技术 Spike 只作为功能证据，不参与体验 verdict。下游 Investigation、Consequence、Narrative、Field UI 与 Audio 接口保持 provisional，待各自 GDD 回填双向依赖。
