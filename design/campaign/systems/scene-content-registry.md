# System GDD: Scene & Content Registry

> Status: **IMPACT REVIEW REQUIRED — 2026-08-20 spatial model change**
>
> Created: 2026-08-16
>
> System map ID: 2
>
> Scope: Formal Campaign only

> Rebaseline note: stable ID、provenance 和内容验证原则继续有效；scene node、viewpoint 与 Web media 假设需要改为 Godot 3D scene / entity / resource 模型后重新评审。

## 1. Overview

Scene & Content Registry 保存正式 Campaign 可引用的场景、人物、可交互物、动作、观察事实、文本和来源标记。它让运行规则读取数据而不是硬编码剧情，同时强制区分原著锚点、项目 Locked 设定、Working 内容与 Prototype legacy。

## 2. Player Fantasy

玩家看到的学校、人物和线索应像同一个世界，而不是互相矛盾的文本卡片。一个门、一个楼梯坐标或一通电话在不同界面出现时，必须指向同一个内容实体和一致来源。

## Game Feel

本系统的手感目标是“回到同一个地方，仍然认得它”。相同 scene、prop、actor 和 fact 在现场、手机与记录层中保持身份、名称和已知状态一致；variant 只改变已发生的部分，不重新生成一个看似相似的替代物。内容加载不能让玩家在已进入场景后看到关键对象迟到、跳位或突然改名；媒体缺失时以稳定结构和文字 fallback 保持空间与行动连续。

## 3. Detailed Rules

### 3.1 Stable identity

每个 runtime 可引用实体都拥有全仓库唯一 stable ID。ID 使用 domain prefix 和 kebab-case，例如 scene-、actor-、prop-、fact-、action-、dialogue-。

ID 表达身份，不包含会变化的显示名称、章节顺序或翻译文本。

### 3.2 Required provenance

每条会影响故事或规则的内容都必须标记 provenance：

- original-anchor：已在 canon 文件核对的原著事实；
- project-locked：用户明确锁定的同人项目选择；
- project-working：当前可修改、未锁定的设计；
- prototype-legacy：只用于槐荫里证据，Campaign runtime 默认拒绝；
- generated-runtime：由确定规则产生的运行事件，不属于 authored canon。

原著正文不得作为 content value 复制进 registry。锚点只记录项目需要的摘要、来源状态和引用路径。

### 3.3 Content record groups

- scene：空间节点、可见方向、正常参照、可用动作引用；
- actor：身份引用、可见表现、初始位置和知识引用；
- prop：物理位置、状态集合和 interaction affordance；
- action：动词、目标、前置条件、cost reference 和 outcome rule reference；
- fact：观察内容、来源、可信度类型和可反驳关系；
- dialogue/comms：本地化 key、speaker、trigger 和 state effects reference；
- media：原创资产 ID、alt/caption、许可与加载策略；
- chapter manifest：本章允许加载的 content IDs 与 version。

### 3.4 Localizable text

Registry 保存 localization key 和必要变量，不把玩家可见长文本写进规则函数。变量必须有明确类型、缺失 fallback 和长度边界。

### 3.5 Validation

构建或测试阶段必须验证：

1. ID 唯一；
2. 所有 reference 存在；
3. Campaign manifest 不引用 prototype-legacy；
4. original-anchor 引用 canon 文档中真实条目；
5. OPEN / PAUSED 内容没有被标为 project-locked；
6. 可交互物具备键盘标签和非纯视觉描述；
7. media 具备来源与许可记录。

### 3.6 Content loading

只加载当前章节 manifest 和公共基础内容。场景转移可按需加载媒体，但 rule/content definitions 必须在 command 可用前完成验证。

## 4. Formulas

### 4.1 Registry validity

RegistryValid = UniqueIDs ∧ ReferencesResolve ∧ ProvenanceValid ∧ CampaignScopeValid ∧ AccessibilityMetadataValid。

所有条件必须为 true；不存在“部分通过后在运行时猜测”的模式。

### 4.2 Reference completeness

Completeness = ResolvedReferenceCount / DeclaredReferenceCount。

- range：0.0–1.0；
- release/build requirement：1.0；
- example：一个 scene 声明 12 个 references，11 个可解析，则 completeness = 0.917，validation FAIL。

### 4.3 Manifest load ratio

LoadRatio = LoadedRequiredRecords / ManifestRequiredRecords。

进入 playable scene 前必须为 1.0。媒体可按单独策略延迟，但其 fallback metadata 必须已加载。

## 5. Edge Cases

- Duplicate ID：构建失败，不能以后写覆盖前者。
- Missing reference：包含 source file 和 field path 的验证错误；runtime 不显示损坏动作。
- Canon conflict：不自动选边，阻止 project-locked 发布并要求更新基线或 canon anchor。
- Working content used by locked chapter：允许运行，但在 review report 标为 provisional，不能称为 canon。
- Prototype legacy reference：Campaign manifest 验证失败。
- Missing localization string：显示明确开发 fallback，不显示空白，也不把 key 当正式文本发布。
- Missing media：使用有意义的文本/结构 fallback，核心动作仍可完成。
- Circular content references：对允许的双向关系使用 ID link；加载器按 manifest 建表后解析，不递归实例化。
- Paused first-ghost record：可以存在 rejected/history 文档，但不能进入 playable manifest。

## 6. Dependencies

| Dependency | This system needs | Other system needs from this |
|---|---|---|
| Canon docs and decision log | Source truth and status | Traceable references |
| Campaign State | Runtime state schema | Stable IDs and content definitions |
| Spatial Exploration | Interaction model requirements | Scenes, props, directions and actions |
| Investigation | Fact schema and relationship needs | Facts, sources and validation references |
| Narrative | Actor/dialogue requirements | Actor, dialogue and localization records |
| Audio/Art | Media production constraints | Media IDs, provenance and fallback metadata |
| Persistence | Content version contract | Manifest/content version identifiers |

## 7. Tuning Knobs

| Knob | Default | Safe range | Effect |
|---|---|---|---|
| Chapter manifest granularity | Per chapter | Per act–per chapter | Load size and authoring overhead |
| Media preload radius | Current scene + immediate destination | Current scene–two hops | Transition smoothness vs. memory/load |
| Development warning threshold | Any provisional record | 0–10 records | Review visibility；release 仍要求明确接受 |

同时可见热点数量、移动节点数量和观察距离不在本系统中调整，必须等待 Spatial Scene Exploration GDD。

## 8. Acceptance Criteria

- 自动验证能在 duplicate ID、missing reference、prototype-legacy leak 时失败并指出来源。
- 每个 original-anchor runtime record 都能追溯到 canon 文件条目。
- Campaign manifest 不包含鬼影、门牌七日制或已否决第一只鬼的 playable record。
- 玩家可见文本通过 localization key 获取，规则函数不内嵌长篇叙事。
- 每个可交互 prop 都有文字 label、action verb 和非颜色-only状态。
- 场景进入前 required record load ratio 为 1.0。
- 缺失媒体时仍能用结构和文本完成核心路径。

## Lean Self-Review

PASS：内容身份、来源分层、验证和加载边界明确；没有决定空间交互模型，也没有把 Working 内容伪装成 canon。
