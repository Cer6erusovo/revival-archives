# Campaign Systems Map: Revival Archives / 复苏档案

> Version: 1.0
>
> Created: 2026-08-16
>
> Status: WORKING — Systems Design index
>
> Source concept: [game-concept.md](game-concept.md)
>
> Scope: Formal Campaign only; [design/gdd/systems-index.md](../gdd/systems-index.md) remains the Huaiyinli Prototype index

## 1. Overview

正式 Campaign 需要支持一个可重复的规则调查循环：

认识正常空间 → 异常侵入 → 观察事实 → 提出假设 → 冒险验证 → 获得可解释后果 → 将人物、线索和代价带入后续章节。

系统边界围绕“现场、规律、后果、长期状态”建立。它不是传统战斗 RPG，因此不需要伤害、装备、掉落、刷怪或传统技能树系统。

本图只回答“需要哪些系统、彼此依赖什么、先设计什么”。它不替代单个系统 GDD，也不为 OPEN / PAUSED 的第一只鬼补写能力。

## 2. Systems Enumeration

| # | System | Category | Source | Priority | Depends On | Status |
|---|---|---|---|---|---|---|
| 1 | [Campaign State & Event](systems/campaign-state-and-events.md) | Foundation | Implicit | MVP | — | Approved |
| 2 | [Scene & Content Registry](systems/scene-content-registry.md) | Foundation | Explicit | MVP | — | Approved |
| 3 | [Input, Settings & Accessibility Contract](systems/input-settings-accessibility.md) | Meta/Foundation | Explicit | MVP | — | Approved |
| 4 | [Versioned Campaign Persistence](systems/campaign-persistence.md) | Persistence | Explicit | MVP | 1, 2 | Approved |
| 5 | [Spatial Scene Exploration](systems/spatial-scene-exploration.md) | Core Gameplay | Explicit | MVP | 1, 2, 3 | Approved — functional spike is evidence only |
| 6 | Investigation & Rule Reasoning | Core Gameplay | Explicit | MVP | 1, 2, 5 | Not Started |
| 7 | Consequence & Failure Explanation | Core Gameplay | Explicit | MVP | 1, 2, 6 | Not Started |
| 8 | Narrative & Relationship State | Narrative | Explicit | MVP thin slice / VS full | 1, 2, 7 | Not Started |
| 9 | Field Interaction Presentation | Presentation | Explicit | MVP | 3, 5, 6, 7, 8 | Not Started |
| 10 | Archive & Casebook | Presentation/Narrative | Explicit | MVP | 3, 4, 6, 8 | Not Started |
| 11 | Audio & Atmosphere | Presentation | Explicit | MVP | 1, 2, 3, 5, 7 | Not Started |
| 12 | Supernatural Cost & Growth | Progression | Explicit | Vertical Slice | 1, 2, 6, 7, 8 | BLOCKED — first ghost PAUSED |
| 13 | Chapter & World Progression | Progression | Explicit | Alpha | 1, 2, 4, 8, 12 | Not Started |

### 2.1 为什么需要这些隐含系统

- 场景探索需要一个独立的 Campaign state；否则地点、人物和后果会散落在 DOM 与文本里。
- 章节内容需要可验证的 registry；否则原著锚点、项目选择和可交互内容容易混写。
- Web 游戏的输入、音量、reduced motion 和键盘规则必须先成为契约，不能等 UI 完成后补救。
- 长期 Campaign 必须使用独立、版本化存档，不能让 Prototype 的 localStorage 状态泄漏进正式剧情。
- 失败必须由 consequence resolver 指向已观察或可回溯的原因，不能只播放死亡文本。

## 3. System Boundaries

### 3.1 Campaign State & Event

拥有当前章节、场景、位置、人物状态、调查状态和领域事件序列。它只保存确定状态与已发生事件，不包含 DOM、长篇剧情文本或具体音画表现。

### 3.2 Scene & Content Registry

拥有场景节点、可交互物、动作定义、事实来源、文本资源和内容版本。原著锚点、同人设定和运行时状态使用不同字段或命名空间。

### 3.3 Input, Settings & Accessibility Contract

定义鼠标、键盘、焦点、字幕、音量、文本缩放和 reduced motion 的最低行为。它提供约束，不直接渲染具体场景。

### 3.4 Versioned Campaign Persistence

负责保存、加载、版本校验、迁移、损坏恢复和明确重置。Campaign 与 Prototype 使用不同 storage key、schema version 和入口边界。

### 3.5 Spatial Scene Exploration

负责玩家如何理解位置、选择移动、查看方向、接近交互物和识别空间异常。采用用户确认的 A 模型：固定空间节点 + 节点内有限转向、手电、局部观察与直接交互。不是纯点击换页，也不是自由移动。

### 3.6 Investigation & Rule Reasoning

拥有观察事实、来源可信度、矛盾、假设、验证条件和规律确认。它不自动替玩家给出正确答案，也不负责人物感情。

### 3.7 Consequence & Failure Explanation

根据已发生行动、暴露状态和规律条件产生后果，并记录玩家失败前能够观察到的原因链。它不决定镜头、音效或死亡文案排版。

### 3.8 Narrative & Relationship State

拥有人物是否在场、知道什么、信任如何表现、承诺与未完成行动等叙事状态。关系不默认使用可见好感度数值；具体表达方式留给 GDD。

### 3.9 Field Interaction Presentation

把场景、动作、反馈、人物和当前可知状态呈现在浏览器中。它只派发 command 和渲染事件，不拥有游戏规则。

### 3.10 Archive & Casebook

把已发现事实、来源、矛盾、人物和案件后果组织成可复查信息。它不是总部权限的同义词：第一章可表现为个人记录，后续才升级为官方档案。

### 3.11 Audio & Atmosphere

拥有环境层、空间声音、关键提示、音乐进入条件和音量策略。关键声音必须提供不泄底的非听觉备份。

### 3.12 Supernatural Cost & Growth

未来负责能力触发、适用边界、代价、复苏/异化症状和灵异拼图。当前只锁定系统职责，不定义第一只鬼、数值或成长树。

### 3.13 Chapter & World Progression

负责章节解锁、事件档案、官方体系接触和长期状态延续。它不生成后续剧情，也不能越过当前 PAUSED 停止线。

## 4. Dependency Layers

### Foundation

1. Campaign State & Event
2. Scene & Content Registry
3. Input, Settings & Accessibility Contract

这些系统没有玩法依赖，先定义数据与行为边界。

### Core

4. Versioned Campaign Persistence — depends on State and Content schemas
5. Spatial Scene Exploration — depends on State, Content and Input contract
6. Investigation & Rule Reasoning — depends on State, Content and Exploration
7. Consequence & Failure Explanation — depends on State, Content and Investigation

### Feature

8. Narrative & Relationship State — consumes state and consequences
12. Supernatural Cost & Growth — consumes investigation and consequence contracts
13. Chapter & World Progression — consumes persistence, narrative and supernatural state

### Presentation

9. Field Interaction Presentation — wraps exploration, investigation, consequence and narrative
10. Archive & Casebook — wraps investigation, persistence and narrative
11. Audio & Atmosphere — reacts to state, exploration and consequences

### Polish

没有单独的“无障碍补丁层”。可访问性从 Foundation contract 进入所有 Presentation 系统。视觉抛光、额外动画和内容扩展只能在核心路径可用后增加。

## 5. Dependency Graph

~~~text
Campaign State ─┬─> Persistence ────────────────────────┐
                ├─> Spatial Exploration ─> Investigation ─> Consequences
Content Registry┤           │                  │              │
                └───────────┴──────────────────┴──────────────┤
Input / Accessibility ──────┬───────────────> Field UI        │
                            ├───────────────> Archive          │
                            └───────────────> Audio            │
Consequences ───────────────────────────────> Narrative ──────┤
Investigation + Narrative + Consequences ───> Supernatural    │
Persistence + Narrative + Supernatural ─────> World Progression
~~~

### 5.1 Bottlenecks

- Campaign State & Event：所有运行系统共享的事实边界；
- Scene & Content Registry：所有可玩内容和原著/同人分层的来源；
- Spatial Scene Exploration：决定 Web 端是否真的有“在现场”的交互；
- Investigation & Rule Reasoning：决定规则恐怖是否成立；
- Consequence & Failure Explanation：决定失败是否公平且可复盘。

### 5.2 Circular Dependency Check

当前图没有必须的循环依赖。

潜在循环“叙事触发后果 ↔ 后果改变叙事”通过事件契约拆开：Narrative 提交 command 或事实，Consequence 产生 event，Narrative 再消费 event 更新人物状态；两者不得直接互相修改内部数据。

## 6. Priority Tiers

### 6.1 MVP — Campaign Concept Prototype

MVP 使用系统 1–11 的最小切片，验证：

- 玩家能先学会正常校园，再发现空间对应被破坏；
- 现场动作产生可观察事实；
- 玩家能形成并验证至少一个假设；
- 失败或后果能指出原因链；
- 人物、通话和关系状态参与选择；
- 场景、档案、声音、存档和键盘操作共同完成一条浏览器路径。

“系统属于 MVP”不等于一次实现其完整 Campaign 能力。例如 Narrative 在 MVP 中只覆盖第一至第四幕需要的人物状态，Archive 只覆盖当前事件的个人记录。

### 6.2 Vertical Slice

在所有 MVP 系统的完整一章切片上增加：

- Supernatural Cost & Growth 的第一只鬼实例；
- 第一章第五幕后续与结局；
- 白月光事件在本章的完整后果；
- 完整章节重试、保存和质量表现。

该层当前被第一只鬼和第五幕 PAUSED 阻塞，不能靠系统文档绕过。

### 6.3 Alpha

- Chapter & World Progression；
- 进入官方体系后的档案与通讯升级；
- 多案件状态延续；
- 长期人物关系与灵异拼图。

### 6.4 Full Vision

- 更完整的大昌市与同期事件交集；
- 多章节长期成长和后果回收；
- 经过验证后的表现与可访问性抛光。

不承诺 MMO、无缝开放世界、程序生成案件、联网账户或云存档。

## 7. Recommended Design Order

| Order | System | Priority | Layer | Effort | Why now |
|---|---|---|---|---|---|
| 1 | Campaign State & Event | MVP | Foundation | M | 先明确所有系统共同读写什么，避免状态藏在 UI |
| 2 | Scene & Content Registry | MVP | Foundation | M | 让场景、事实、原著锚点和项目设定保持可追踪 |
| 3 | Input, Settings & Accessibility Contract | MVP | Foundation | S | 在任何界面设计前锁定键盘、声音与动效底线 |
| 4 | Versioned Campaign Persistence | MVP | Core | S | 提前隔离 Prototype 与 Campaign 数据 |
| 5 | Spatial Scene Exploration | MVP | Core | L | 最高体验风险；决定“在现场”是否成立 |
| 6 | Investigation & Rule Reasoning | MVP | Core | L | 核心规则调查循环 |
| 7 | Consequence & Failure Explanation | MVP | Core | M | 让验证风险公平、失败可复盘 |
| 8 | Narrative & Relationship State | MVP/VS | Feature | M | 让普通生活与人物选择拥有系统后果 |
| 9 | Field Interaction Presentation | MVP | Presentation | L | 把核心系统变成真实浏览器操作 |
| 10 | Archive & Casebook | MVP | Presentation | M | 支持跨场景核对而不替玩家解题 |
| 11 | Audio & Atmosphere | MVP | Presentation | M | 声音是空间判断与恐怖反馈的一部分 |
| 12 | Supernatural Cost & Growth | VS | Feature | L | 必须等第一只鬼设计重开 |
| 13 | Chapter & World Progression | Alpha | Feature | L | 先有完整单章再设计长期扩展 |

## 8. High-Risk Systems

| System | Risk | Why | Mitigation |
|---|---|---|---|
| Spatial Scene Exploration | Design / Technical | 过于抽象会退化成卡片，过于自由会超出个人 Web 项目范围 | 在 GDD 中比较 2–3 种交互模型，再做一段正常校园与一段鬼域路线原型 |
| Investigation & Rule Reasoning | Design | UI 可能替玩家自动解题，或线索不足导致猜答案 | 每条规律记录事实、来源、验证动作和错误反馈 |
| Consequence & Failure Explanation | Design | 随机死亡会破坏公平感，过度预警又会失去恐怖 | 为每个关键后果建立可观察原因链与复盘记录 |
| Narrative & Relationship State | Scope | 容易退化为好感度条或分支爆炸 | 使用少量有语义的关系/承诺状态，并限制每章可变节点 |
| Audio & Atmosphere | Browser / Accessibility | 自动播放限制、设备差异和纯声音谜题 | 用户手势启用、分轨音量、非听觉备份和实机试听 |
| Persistence | Data integrity | 正式存档污染 Prototype 或未来版本无法读取 | 独立 key、schema version、迁移测试和安全重置 |
| Supernatural Cost & Growth | Design / Canon | 第一只鬼未定，能力易撞原著或变成技能树 | 保持 BLOCKED；重开后先做能力撞车与野生规律检查 |

## 9. Explicitly Excluded

- 传统伤害、护甲、武器和 Boss 血条；
- 装备稀有度、随机掉落、刷怪经验和传统技能树；
- 实时多人、账号、云存档和排行榜；
- 无缝开放世界、程序生成灵异事件和 MMO 社交；
- Prototype 的七日行动点、鬼影、门牌和现有存档 schema；
- 在第一章停止线之后自动生成剧情的系统；
- 把杨间当作可长期编队的同伴系统。

## 10. Progress Tracker

| Metric | Count |
|---|---|
| Total Campaign systems | 13 |
| MVP systems / slices | 11 |
| Vertical Slice-only systems | 1 |
| Alpha-first systems | 1 |
| System GDDs started | 5 |
| Lean formally reviewed GDDs | 5 |
| System GDDs approved | 5 |
| Blocked systems | 1 |

## 11. Lean Self-Review

- 13 个系统共同覆盖了现场、规律、后果、人物、音画、存档和长期成长，没有引入传统战斗或 MMO 范围。
- 所有 MVP 系统都能追溯到核心循环或 Web 可用性要求；没有仅为“以后也许有用”而加入的系统。
- 依赖图没有硬循环，潜在 narrative/consequence 循环已有事件边界。
- Prototype 与 Campaign 的系统、入口和存档保持分离。
- Supernatural Cost & Growth 明确阻塞，没有通过系统图偷定第一只鬼。
- Foundation 1–4 与 Spatial Scene Exploration 已完成 lean 正式评审并批准；评审记录位于 `systems/reviews/`。
- Spatial Scene Exploration 技术 Spike 仅验证浏览器功能路径，不承担现场感验收。
- TD-SYSTEM-BOUNDARY、PR-SCOPE 与 CD-SYSTEMS 独立代理审查未运行；lean 流程下这些不是 PHASE-GATE。

## 12. Next

1. Campaign Concept → Systems Design gate 已于 2026-08-16 通过；
2. Foundation 1–4 与 Spatial Scene Exploration GDD 已批准；
3. Spatial Scene Exploration A 技术 Spike 已完成浏览器功能验证，但不是体验门禁；
4. 下一项按设计顺序进入 Investigation & Rule Reasoning；
5. 第一只鬼和第五幕保持 PAUSED。
