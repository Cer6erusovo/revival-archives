# Revival Archives — AI / Agent Operating Contract

本文件适用于整个仓库。任何 GPT、Codex、Claude Code 或其他 AI 在规划、改设计或写代码前必须先读本文件。

## 1. 事实优先级

当文档冲突时，按以下顺序处理：

1. `design/campaign/CURRENT-LOCKED-BASELINE.md` 与其后新增的 Locked 决策。旧 decision-log 条目若与该基线冲突，以该基线为准。
2. `design/campaign/canon/original-work-anchors.md` 中已核对的原著锚点。
3. `design/campaign/decisions/decision-log.md` 中未被后续条目撤销的 Locked 决策。
4. `design/campaign/` 下标记为 Working 的当前设计。
5. `HANDOFF.md` 的当前工作进度。
6. 槐荫里 Prototype 设计和实现。
7. Claude-Code-Game-Studios 的通用模板与默认假设。

禁止用旧 Prototype、框架默认模板或 AI 自己的偏好覆盖更高优先级事实。

## 2. 当前必须知道的产品事实

- 正式游戏名：《复苏档案》 / Revival Archives。
- 免费、非商业、单人第一人称 3D 桌面同人游戏；正式 Campaign 的引擎方向为 Godot 4。现有 Web 版本只保留槐荫里 Prototype 与历史技术 Spike。
- 世界观与《神秘复苏》一致，但原创主角拥有独立传奇。
- 主角是杨间同校生，七中事件时在邻近班级；不是杨间队友，也不跟着杨间重走原作剧情。
- 第一案就是七中敲门鬼事件，不另造一个抢戏的“第一大事件”。
- 主角第一只鬼确定为 **鬼锁**；名称、逐间落锁猎杀与厕所隔间提示已经锁定，破解、救人、防御、驾驭、复苏与长期能力仍为 OPEN。
- 第一章设计已重开到鬼锁初次事件：第一批学生在旧教室区域休息后被逐间落锁猎杀，厕所隔间事件使主角初步怀疑“关门 / 落锁是猎杀标志”。不得自动补完其后规律或第一章结局。
- Campaign Concept gate 已通过，当前阶段仍为 **Systems Design rebaseline**。原 A 混合节点式 GDD 与 `prototypes/campaign-spatial-a/` 只保留为 Web 技术证据；正式 Campaign 转向第一人称 3D 后，空间、输入、存档与表现系统必须重新评审，不能把旧批准状态直接带入 Godot 实现。
- 鬼影绝不能作为主角核心能力；那是杨间后续重要能力。
- 主角长期拥有进入同时代第一梯队的潜力，但路径、最终拼图和终局能力尚未锁定，不能提前绑定某个候选能力。
- 白月光在七中失踪，后期真实重逢时已经不能算正常人；她不是普通驭鬼者式复活。
- 现有槐荫里 Prototype 是玩法验证资产，不是 Campaign 正史。其鬼影、门牌能力和七日结构均不可默认继承。

## 3. 设计协作规则

- 用户提出意见不等于必须照单全收。要讨论、指出冲突、给出反对理由和替代方案。
- 不允许一次性把未来几十章自动补完。按当前讨论粒度慢慢打磨。
- 每个新厉鬼/能力在锁定前必须做原著能力撞车检查。
- 原著事实、同人项目选择、暂定假设必须明确区分，禁止混写。
- 不得为了让原创主角显得重要而改写杨间的关键原作功绩。
- 杨间与主角的交集以擦肩、档案、偶发协作或彩蛋为主；交集必须让两条传奇都成立。
- 厉鬼能力优先从“鬼的规律”出发，而不是从传统超能力分类出发。
- 不做无代价技能、数值刷怪、装备稀有度、传统升级树或 MMO/open-world 膨胀。

## 4. 修改设计后的落盘要求

任何重要设计变化都应同步更新：

1. 对应主题文档；
2. `design/campaign/decisions/decision-log.md`；
3. 若改变当前推进位置，再更新 `HANDOFF.md`。

被否决的重大方案不要彻底删掉；在 decision log 记录“Rejected + 原因”，避免下一个 AI 再次提出同一条弯路。

## 5. 实现边界

当前 `src/` 是槐荫里 Prototype 的稳定实现。Campaign 第一章未完成设计 gate 前：

- 不为目录整洁而搬动 `src/`；
- 不重写现有 Pages 入口；
- 不把当前 Prototype 存档格式强行变成 Campaign 存档格式；
- 可以设计未来代码布局，但正式迁移必须单独评审。

未来实现目标见 `docs/architecture/target-project-layout.md`。
