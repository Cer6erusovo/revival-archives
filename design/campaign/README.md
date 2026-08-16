# 正式 Campaign 设计入口

这里是《复苏档案》正式游戏的事实源。`design/gdd/` 当前主要保存槐荫里 Prototype 设计，不能用来覆盖本目录。

## 状态

- Phase: Systems Design
- Review mode: lean
- Campaign implementation: 尚未开始
- Opening chapter: 大昌市第七中学敲门鬼事件并行原创路线
- Current refinement: 第一章第四幕结构与第五幕入口已锁定；后续剧情与第一只鬼为 OPEN / PAUSED
- Current workflow: A 混合节点式隔离原型已通过浏览器功能验证，等待用户现场感体验

## 阅读顺序

1. `CURRENT-LOCKED-BASELINE.md` — 当前最高优先级基线
2. `game-concept.md` — 正式 Campaign 产品概念
3. `art-bible.md` — 正式 Campaign 视觉、界面、动效与资产约束
4. `systems-map.md` — 正式 Campaign 系统边界、依赖与设计顺序
5. `concept-baseline.md` — 整体产品方向
6. `chapters/ch01-seven-high-school.md` — 第一章当前版本与停止线
7. `narrative/protagonist.md` — 主角人格与长期成长
8. `narrative/white-moonlight.md` — 白月光长期线
9. `canon/original-work-anchors.md` — 已核对的原著事实
10. `canon/ability-collision-blacklist.md` — 原著能力撞车禁区
11. `decisions/decision-log.md` — 设计取舍与被否决/撤销方案
12. `supernatural/deadlock.md` — 已撤销的“死锁”候选档案，仅供避免设计回退

## 状态标签

- **LOCKED**：用户已明确确认，后续不得静默改写。
- **WORKING**：当前认可方向，但允许继续讨论修改。
- **OPEN**：尚未设计。
- **REJECTED**：已经讨论并否决，除非有新理由不要重复提出。
- **REVOKED**：曾经锁定、后来明确撤销，不再属于正式设定。
- **PAUSED**：刻意停止推进，未经用户明确重开不得自动续写。

## 当前与 Prototype 的关系

槐荫里 Prototype 继续保留、继续可玩，但只作为玩法实验：

- 可继承：调查终端经验、规则推理、模糊复苏征兆、存档/验证经验。
- 不自动继承：鬼影、门牌鬼、七日制作为全局结构、主角已经拥有总部权限等叙事。

等正式 Campaign concept 和 opening slice 通过 gate，再决定如何把现有代码拆为 Campaign 与 Prototype。
