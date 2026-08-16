# System GDD: Campaign State & Event

> Status: BASELINE — lean self-review passed
>
> Created: 2026-08-16
>
> System map ID: 1
>
> Scope: Formal Campaign only

## 1. Overview

Campaign State & Event 是正式 Campaign 的确定性事实中心。它保存“现在发生到了哪里、谁处于什么状态、玩家已经确认什么”，接收 player command，验证后生成 domain event，再以一次原子提交更新状态。DOM、长篇文本、音效和动画都只能读取它，不能成为隐藏的第二份游戏状态。

## 2. Player Fantasy

玩家应感到自己的每个行动都在同一个可信世界里留下痕迹：门打开过、电话断过、某人被看见或失踪、一个假设被证实，这些事实不会因切换界面而消失，也不会被剧情方便地重写。

## 3. Detailed Rules

### 3.1 State partitions

状态至少按职责分为：

- session：Campaign ID、content version、state revision、当前 checkpoint；
- chapter：当前章节、幕、进度节点和章节级 flags；
- scene：当前空间节点、朝向/观察上下文、已改变物件；
- actors：在场、失踪、受伤、已知事实和关系语义状态；
- investigation：观察事实、来源、假设和验证结果；
- narrative：通话、承诺、对话分支与已发生叙事事件；
- supernatural：只预留由后续系统拥有的引用；第一只鬼 PAUSED 时不得填充实例；
- progression：只保存已由 Chapter & World Progression 确认的长期结果。

### 3.2 Command lifecycle

1. UI 或 content action 提交 command；
2. State 验证 command ID、当前 revision、前置条件与目标；
3. 无效 command 返回明确 rejection，不改变状态；
4. 有效 command 由对应规则产生一个或多个 event；
5. 所有 event 在内存中完成 reduce；
6. 整组 event 成功后一次性提交新状态；
7. Presentation 和 Persistence 只消费已提交结果。

### 3.3 Ownership

- State owns current truth, not authored content.
- Content Registry owns definitions, State only stores stable IDs and runtime values.
- Consequence owns outcome rules, State applies its events.
- Narrative owns meaning of relationship states, State stores their current values.
- UI never writes fields directly and never derives permanent truth from CSS classes or DOM order.

### 3.4 Determinism

相同初始 state、content version 和 command sequence 必须得到相同最终 state 与 event sequence。当前 Campaign 不引入随机数；未来若需要，必须由显式 seed 和独立 ADR 管理。

### 3.5 Event history

运行时保留近期 domain event 供反馈、存档和调试。正式档案只收录玩家有权知道的事实，不直接暴露内部事件名或隐藏条件。

## 4. Formulas

### 4.1 State revision

R_next = R_current + 1，仅当一组 command events 成功提交。

- R：非负安全整数；
- accepted command：revision 增加 1；
- rejected command：revision 不变；
- example：revision 18 提交一次“打开防火门”command 后为 19；重复旧 command 被拒绝时仍为 19。

### 4.2 Event sequence

S_event(i) = S_previous + i，其中 i 从 1 到本次提交的 event count。

- S：本次存档范围内单调递增的非负安全整数；
- event count 建议范围：1–20，异常超出时视为规则设计或内容批处理错误；
- example：上次 event sequence 为 41，本次产生 3 个 event，则编号为 42、43、44。

### 4.3 Predicate result

Valid(command) = SchemaValid ∧ RevisionMatches ∧ PreconditionsMet ∧ TargetExists。

任何一项为 false 都拒绝 command，且 state mutation count 必须为 0。

## 5. Edge Cases

- Duplicate command ID：返回 duplicate rejection，不重复产生 event。
- Stale revision：拒绝并要求 UI 用最新 state 重绘，不尝试猜测合并。
- Missing content ID：停止该 command，记录可诊断错误，保持最近一次有效 state。
- Partial reducer failure：整组 event 不提交，不能留下半个后果。
- Scene transition interrupted：只恢复最后一次已提交 checkpoint，不保存过渡动画中间态。
- Unknown future field：加载时交由 Persistence migration；State 不静默删除。
- PAUSED supernatural content：任何 command 若引用未定义第一只鬼实例，必须被 schema 或 content validation 拒绝。
- Ending or death event：先提交导致结果的事实，再提交结束状态，保证复盘能看到原因链。

## 6. Dependencies

| Dependency | This system needs | Other system needs from this |
|---|---|---|
| Scene & Content Registry | Stable IDs, schemas, precondition definitions | Runtime state references and validation context |
| Persistence | Atomic envelope save/load | Serializable state and revision |
| Spatial Scene Exploration | Movement/look commands | Current scene and committed spatial events |
| Investigation | Observation and hypothesis commands | Investigation state partitions and emitted facts |
| Consequence | Outcome events | Current facts and command context |
| Narrative | Actor and relationship events | Actor/narrative partitions |
| Presentation | Commands only | Immutable view state and event feedback |

## 7. Tuning Knobs

| Knob | Default | Safe range | Effect |
|---|---|---|---|
| Recent event buffer | 200 | 100–500 | Debug/feedback history size；不改变玩法 |
| Max events per command | 20 | 5–50 | 防止异常批量更新；超过上限视为设计错误 |
| Checkpoint event retention | Current checkpoint only | 1–3 checkpoints | 恢复与诊断成本；由 Persistence 最终锁定 |

State revision、command validation 和原子提交不是 tuning knobs，不允许内容层覆盖。

## 8. Acceptance Criteria

- 相同初始 state 与 command sequence 在测试中产生完全相同的 final state 和 event order。
- 无效、重复或 stale command 不改变任何 gameplay field。
- 任意 reducer 抛错时，提交前后 state 深度相等。
- UI 测试能证明游戏状态不依赖 DOM element、CSS class 或当前 screen。
- death/end event 的日志中，导致结果的 observable fact 排在终止状态之前。
- 第一只鬼未定义时，所有 supernatural instance command 都被拒绝。
- serialized state 不包含长篇正文、HTML node 或函数。

## Lean Self-Review

PASS：职责、命令边界、确定性、失败原子性和后续系统接口均已定义；没有写入剧情、交互模型或第一只鬼。
