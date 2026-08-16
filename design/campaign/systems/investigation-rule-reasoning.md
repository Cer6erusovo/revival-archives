# Investigation & Rule Reasoning

> **Status**: In Design
>
> **Author**: User + Codex
>
> **Last Updated**: 2026-08-17
>
> **System Map ID**: 6
>
> **Scope**: Formal Campaign only

## Overview

Investigation & Rule Reasoning 是正式 Campaign 中由玩家直接参与的调查推理系统。它只接收玩家在现场主动观察到的事实及其来源信息，让玩家识别矛盾、形成可被验证或推翻的假设，并通过现场行动承担验证风险。系统不会自动收集未观察线索、替玩家选择正确答案，也不负责决定人物关系或执行失败后果。没有这个系统，规则恐怖就会退化成按顺序点击线索和阅读剧情。

## Player Fantasy

玩家应当感觉自己不是在档案界面里猜开发者准备的答案，而是在证据残缺、每次验证都可能付出真实代价的灵异现场保持清醒。满足感来自亲自发现一个具体的不一致，提出能够被证明或推翻的解释，选择一次有风险的现场行动，并从环境真实反馈中确认自己究竟判断对了什么。

这种体验同时保留脆弱感与主动权：玩家无法用火力压制厉鬼，也不会被系统替代思考；未知规律令人恐惧，但失败不是毫无征兆的随机抽签。错误假设会被已发生的事实推翻，正确判断则为玩家争取一条暂时可走的生路，而不是直接宣布胜利。

## Game Feel

调查采用“现场先发生，记录后整理”的双轨反馈。玩家完成观察或验证动作后，输入必须立即得到响应，但事实是否成立只能由场景、人物、声音或空间状态表现；记录层要等玩家实际感知结果后才更新，不能抢先揭示变化。

基本节奏是：观察异常 → 停下来比较 → 提出假设 → 决定是否冒险验证 → 现场产生后果 → 记录已知事实。紧张感来自“是否值得验证”以及“验证会让谁暴露在危险中”，而不是持续倒计时或快速点击。

正确判断不播放胜利音效、绿色勾选或“规律已破解”大字；它只让某个局部关系变得可以依赖，例如出口不再重复、声音距离恢复一致，或者某人暂时避开触发条件。错误假设同样先由现场事实推翻，再由记录层标明矛盾。信息不足时保持“尚未证实”，不把沉默伪装成正确或错误。

记录层只复述玩家已经观察到的内容、来源和矛盾，不自动连线、不推荐正确答案，也不使用颜色直接标记真伪。任何必要声音线索必须有不泄露答案的视觉或文字反馈。

## Detailed Design

### Core Rules

1. **事实来自行动。** 只有玩家完成观察、交谈、监听或现场操作后，系统才能生成事实。进入场景、打开记录或经过 hotspot 不会自动收集线索。
2. **记录“观察到了什么”，不直接记录真相。** 每条事实包含内容、来源、发生位置、时间背景和来源类型。例如“某人说楼梯没有尽头”只证明他说过这句话，不证明楼梯真的没有尽头。
3. **可信度不用数值表示。** 来源分为亲眼观察、共同见证、当事人陈述、转述、残缺记录和灵异干扰等类型。系统展示来源差异，但不显示隐藏的可信度分数，也不替玩家判断谁是真的。
4. **矛盾只指出不相容之处。** 当两条已观察事实无法同时成立，记录层可以标明它们互相矛盾，但不能宣布哪一条正确。矛盾关系由正式内容预先定义，运行时不能根据文字相似度猜测。
5. **玩家拼装假设。** 玩家从已观察事实中解锁对象、触发条件、限制条件和结果概念，并组合成结构化假设：`在[范围]内，当[触发条件]且[限制条件]成立时，会发生[结果]。` 系统不提供完整候选答案。自由笔记可以存在，但不参与规则判定。
6. **允许保留多个草稿。** 玩家可以同时记录多个互相竞争的解释。草稿不会改变现场，也不会触发正确或错误提示。
7. **验证必须先声明预期。** 正式验证前，玩家选择一个假设、一个当前可执行的现场行动，以及自己预期会观察到的结果。系统只展示玩家已经知道的直接风险，不泄露隐藏后果。
8. **现场先产生结果。** 验证行动交给 Spatial Scene Exploration 与 Consequence & Failure Explanation 执行。玩家先在场景中看到、听到或承担结果，调查系统随后记录新事实。
9. **验证有三种结果。** `Supported` 表示结果符合假设，但可能仍不足以确认规律；`Refuted` 表示出现与假设不相容的事实；`Inconclusive` 表示条件不足、观察被中断或结果无法区分多个解释。“没有发生任何事”只有在玩家能够确认验证条件完整时，才能作为反证。
10. **规律使用内容预设的确认条件。** 每条规律拥有自己的证明要求，例如独立重复、不同对象复现、排除一个反例或完成一次明确的受控验证。玩家只能看到尚缺的证据类别，不能看到指定地点、指定动作或正确答案。
11. **确认不是胜利。** 已确认规律只是当前情境中可以依赖的生存知识。它仍可能有适用范围、例外或尚未发现的更深层规律，不会自动解除危险或规划路线。
12. **历史不可擦除。** 玩家可以放弃或修订假设，但已经观察到的事实、被推翻的旧假设和验证代价继续保留，供失败复盘与档案系统使用。

### States and Transitions

| 对象 | 状态变化 |
|---|---|
| 事实 | `Unavailable → Observed`；观察记录保持不变，但可以被标记为 `Unchallenged / Contradicted` |
| 假设 | `Draft → Committed → Testing → Supported / Refuted / Inconclusive` |
| 受支持假设 | 未满足全部证明条件时返回 `Committed`，等待新的验证 |
| 被推翻假设 | 保留历史，可复制为新的 `Draft` 后修改，不能直接改写旧记录 |
| 规律 | 只有满足该规律全部确认条件后，才能从 `Supported → Confirmed` |
| 验证 | 行动开始后不可通过关闭界面撤销；场景结果和代价必须完成记录 |

典型流程：

> 主动观察 → 获得事实 → 发现矛盾 → 拼装多个假设 → 选择一个假设和预期结果 → 执行现场验证 → 先看到后果 → 更新支持或反驳状态 → 满足条件后确认规律。

### Interactions with Other Systems

| 系统 | 调查系统接收 | 调查系统输出 |
|---|---|---|
| Campaign State & Event | 已提交行动与事件顺序 | 事实、假设、验证和规律状态事件 |
| Scene & Content Registry | 事实来源、概念词、矛盾关系、确认条件 | 已解锁内容 ID 与引用状态 |
| Spatial Scene Exploration | 玩家实际完成的观察和现场行动 | 可执行验证意图，不直接修改空间 |
| Consequence & Failure Explanation | 验证行动产生的后果 | 玩家当时采用的假设、预期结果和原因链 |
| Field Interaction Presentation | 当前可观察对象与反馈位置 | 观察、标记矛盾、提交验证所需的信息 |
| Archive & Casebook | — | 已观察事实、旧假设、确认规律和验证历史 |
| Narrative & Relationship State | 人物陈述及其当时状态 | 已发现的事实，不直接修改人物关系 |

## Formulas

本系统没有伤害或概率数值；以下公式全部用于确定性判定。

### 1. Hypothesis Well-Formed

`hypothesis_well_formed(h) = has_scope(h) ∧ has_trigger(h) ∧ has_result(h) ∧ all_terms_unlocked(h)`

| 变量 | 类型 | 范围 | 含义 |
|---|---|---|---|
| `has_scope` | boolean | `true / false` | 是否定义适用范围 |
| `has_trigger` | boolean | `true / false` | 是否定义触发条件 |
| `has_result` | boolean | `true / false` | 是否定义预期结果 |
| `all_terms_unlocked` | boolean | `true / false` | 所有概念是否来自已观察事实 |

**输出范围：** `true / false`。

**示例：** 玩家填写了范围、触发和结果，但结果概念尚未被观察解锁，则假设只能保存为草稿，不能提交验证。

### 2. Visible Contradiction

`visible_contradiction(a, b) = observed(a) ∧ observed(b) ∧ incompatible_in_context(a, b)`

| 变量 | 类型 | 范围 | 含义 |
|---|---|---|---|
| `observed(a)` | boolean | `true / false` | 事实 A 是否已被玩家观察 |
| `observed(b)` | boolean | `true / false` | 事实 B 是否已被玩家观察 |
| `incompatible_in_context` | boolean | `true / false` | 内容数据是否声明两条事实在相同条件下无法同时成立 |

**输出范围：** `true / false`。

**示例：** 玩家先观察到某扇门外是西楼梯，之后在同一时刻、同一扇门观察到门外仍是五楼走廊；两条事实均已获得且内容数据声明它们在该情境下不相容，因此显示矛盾，但不宣布哪条是真相。

### 3. Validation Result

```text
validation_result(h, v) =
  Refuted      if conditions_complete(v) ∧ contradicts_observation(h, v)
  Supported    if conditions_complete(v) ∧ matches_prediction(h, v)
  Inconclusive otherwise
```

| 变量 | 类型 | 范围 | 含义 |
|---|---|---|---|
| `conditions_complete` | boolean | `true / false` | 玩家已知的验证前提是否实际成立 |
| `contradicts_observation` | boolean | `true / false` | 新观察是否与假设预测不相容 |
| `matches_prediction` | boolean | `true / false` | 新观察是否符合假设预测 |

**输出范围：** `Supported / Refuted / Inconclusive`。明确反证优先于支持，条件不完整永远返回 `Inconclusive`。

**示例：** 玩家预测“下行后会回到原楼层”，验证条件完整，但实际抵达了不同且可确认的楼层，则结果为 `Refuted`。

### 4. Confirmation Ready

`confirmation_ready(h) = supported(h) ∧ all_requirements_satisfied(h) ∧ no_unresolved_refutation(h)`

| 变量 | 类型 | 范围 | 含义 |
|---|---|---|---|
| `supported` | boolean | `true / false` | 至少一次完整验证支持该假设 |
| `all_requirements_satisfied` | boolean | `true / false` | 该规律预设的全部证明条件是否满足 |
| `no_unresolved_refutation` | boolean | `true / false` | 当前适用范围内是否不存在尚未解释的反证 |

**输出范围：** `true / false`。

**示例：** 某规律要求一次独立复现和一次受控验证。即使第一次结果符合预测，在两类证明都完成前也只能保持 `Supported`。

### 5. Missing Evidence Categories

`missing_evidence_categories(h) = unique(category(q) for q in requirements(h) if not satisfied(q))`

| 变量 | 类型 | 范围 | 含义 |
|---|---|---|---|
| `requirements(h)` | requirement set | `0–N` 项 | 内容预设的证明要求 |
| `satisfied(q)` | boolean | `true / false` | 某项要求是否满足 |
| `category(q)` | enum | 预设类别 | 独立复现、不同对象、反例排除、受控验证等类别 |

**输出范围：** 尚未满足的证据类别集合。

**示例：** 系统可以显示“仍缺少独立复现”，但不能提示应该去哪一层、让谁执行或选择哪个动作。

### 6. Rule Scope Status

```text
rule_scope_status(r, new_facts) =
  Challenged if confirmed(r)
             ∧ exists(new_facts, contradicts_prediction_within_scope)
  Stable     otherwise
```

| 变量 | 类型 | 范围 | 含义 |
|---|---|---|---|
| `confirmed` | boolean | `true / false` | 规律是否已经确认 |
| `new_facts` | fact set | `0–N` 条 | 确认后新观察到的事实 |
| `contradicts_prediction_within_scope` | boolean | `true / false` | 新事实是否与规律在原适用范围内的预测冲突 |

**输出范围：** `Stable / Challenged`。

**示例：** 已确认规律在新的条件下出现反例，旧规律不会被删除或静默降级，而是标记为“适用范围受到挑战”，并允许玩家据此创建修订假设。

## Edge Cases

- **如果玩家没有提交验证计划，却意外获得关键证据：** 事实照常记录，并可事后附加到假设；它可以满足观察、复现或不同对象等要求，但不能满足“提前声明预期的受控验证”。
- **如果玩家执行危险行动时没有选择假设：** 行动与后果正常发生，所有可观察事实正常记录，但不生成 `Supported / Refuted` 验证结论。
- **如果一次行动同时产生多条事实：** Campaign State 按同一 event group 原子提交全部事实；调查系统在整组提交后统一计算矛盾，不能让中间状态短暂显示错误结论。
- **如果同一人物后来改变说法：** 新说法成为一条带有新时间背景的事实；旧说法不得覆盖或删除，两者是否矛盾由内容关系决定。
- **如果观察过程被中断：** 只有已经发出 observation-complete event 的内容成为事实；未完成观察不生成残缺事实，也不能用于验证。
- **如果验证开始后，必要条件在结果发生前失效：** 现场行动及其代价继续结算，验证结果为 `Inconclusive`。
- **如果同一次完整验证同时出现支持与反驳：** 明确反驳优先，结果为 `Refuted`；内容数据必须保留支持事实，供玩家判断是否需要缩小假设范围。
- **如果预期现象没有发生：** 只有内容预设了明确观察窗口，并且所有已知条件完整时，“没有发生”才能作为反证；否则结果为 `Inconclusive`。
- **如果玩家重复获得同一条事实：** 相同 occurrence ID 不重复记入证明要求；不同时间或对象的独立 occurrence 可以满足复现要求，但必须由对应确认条件允许。
- **如果多条假设预测了同一个结果：** 新事实可以附加到所有相关假设，但提前声明的受控验证只计入玩家当时提交的那一条；其他假设仍需玩家主动判断。
- **如果已确认规律后来出现反例：** 旧记录保持 `Confirmed` 历史，并新增 `Challenged` 状态；系统不得静默撤销、改写或自动生成修订答案。
- **如果验证过程中人物死亡、失踪或场景终止：** 已经被玩家感知的事实先写入 event group，终止事件随后提交；未完成的验证标记为 `Inconclusive`，具体原因交给失败解释系统。
- **如果玩家在验证进行中刷新或关闭页面：** 存档只能恢复到验证开始前的稳定 checkpoint，或恢复到整组后果已经完成的状态，不能加载到半套事实和半个后果之间。
- **如果内容缺少矛盾关系、确认条件或引用对象：** 构建验证必须报错并阻止该内容进入正式章节；运行时不得根据文字相似度临时猜测关系。
- **如果玩家尚未观察到足够概念：** 可以保存个人自由笔记，但不能提交含未知概念的结构化假设；界面只说明“该概念尚无事实来源”，不提示去哪里解锁。
- **如果玩家放弃或删除假设：** 玩家界面可以将其归档隐藏，但事实、验证历史和已经产生的代价不得从 Campaign state 中删除。
- **如果关键事实原本通过声音获得，但玩家静音或无法听见：** 对应视觉、人物反应或文字感知生成同一个 fact ID，不重复计数，也不改变规律判定。

## Dependencies

### Hard Upstream Dependencies

| 系统 | 状态 | 提供的契约 |
|---|---|---|
| Campaign State & Event | Approved | 原子 event group、确定性状态归并、事实先于终止事件的顺序 |
| Scene & Content Registry | Approved | 稳定 ID、事实来源、概念词、矛盾关系、证明要求及原著/同人来源分层 |
| Spatial Scene Exploration | Approved | 玩家真正完成的观察、位置背景、现场动作和可感知结果 |

缺少任意一个硬上游时，调查系统不得自行生成替代事实或猜测内容关系。

### Downstream Consumers

| 系统 | 关系 | 调查系统提供 |
|---|---|---|
| Consequence & Failure Explanation | 完整验证循环的硬依赖；GDD 未设计 | 已提交假设、预期结果、验证行动与当时已知事实 |
| Field Interaction Presentation | 可玩呈现的硬依赖；GDD 未设计 | 当前可执行的观察、假设提交和验证反馈状态 |
| Archive & Casebook | MVP 记录层消费者；GDD 未设计 | 事实、来源、矛盾、旧假设、验证历史和已确认规律 |
| Narrative & Relationship State | 软依赖；GDD 未设计 | 人物已知事实与调查结果，不直接修改关系 |
| Supernatural Cost & Growth | 后续消费者；当前 BLOCKED | 未来可读取规律与验证代价，但本 GDD 不定义第一只鬼 |
| Audio & Atmosphere | 间接协作；GDD 未设计 | 不直接写入调查状态；声音必须先经场景观察转化为 fact |

### Boundary Rules

- Persistence 不直接依赖调查系统；它通过 Campaign State 保存完整 investigation partition。
- Input / Accessibility 不改变判定公式；Field UI 必须按照已经批准的输入与无障碍契约呈现同一组 command。
- 下游系统只能提交 command 或消费 event，不能直接修改事实、假设或规律状态。
- 尚未设计的下游接口全部标记为 provisional；对应 GDD 完成时必须回填双向依赖。
- 本系统不拥有场景后果、人物关系、音画表现、存档写入或第一只鬼能力。

## Tuning Knobs

| 调整项 | 默认值 | 安全范围 | 过低 / 过高的影响 |
|---|---:|---:|---|
| 当前活跃假设数 | 3 | 2–5 | 过低无法保留竞争解释；过高会变成卡片管理 |
| 单个推理阶段同时可用的概念数 | 6 | 4–10 | 过低接近选择题；过高会形成无意义组合噪声 |
| 表层规律的证明要求数 | 2 | 1–3 | 过低容易把偶然当规律；过高会强迫重复劳动 |
| 同一阶段的核心矛盾组数 | 1 | 1–3 | 过低缺少推理点；过高会让玩家无法判断当前重点 |
| 缺失证据提示强度 | 证据类别 | “宽泛提示”至“证据类别” | 完全不提示容易卡死；提示具体地点或动作会泄露答案 |

边界：

- 活跃假设以外的内容进入历史区，不删除、不设玩法容量上限。
- “一次只能正式执行一个验证计划”是确定性规则，不是可调整参数。
- 事实真伪、来源可信度、验证成功率和规律正确性不能成为数值旋钮。
- 具体观察时长由场景行为决定，不能为了提高难度缩短无障碍替代信息。
- Vertical Slice 测试后可以在安全范围内调整默认值；超出范围必须重新评审推理负担与内容成本。

## Visual / Audio Requirements

[To be designed]

## UI Requirements

[To be designed]

## Acceptance Criteria

[To be designed]

## Open Questions

[To be designed]
