# System GDD: Versioned Campaign Persistence

> Status: BASELINE — lean self-review passed
>
> Created: 2026-08-16
>
> System map ID: 4
>
> Scope: Formal Campaign only

## 1. Overview

Versioned Campaign Persistence 负责把已提交的 Campaign state、内容版本和用户设置安全写入浏览器存储，并在刷新、版本升级或损坏时提供可解释恢复。它与槐荫里 Prototype 使用完全不同的 key、schema 和迁移链。

## 2. Player Fantasy

玩家可以放心暂停和回来：进度不会因刷新消失，也不会被旧 Prototype 污染。即使存档损坏或版本变化，游戏会清楚说明恢复到了哪里，而不是默默改写人物或调查结果。

## 3. Detailed Rules

### 3.1 Storage namespaces

至少分为三个独立 namespace：

- campaign-save：当前 Campaign checkpoint 和 committed state；
- campaign-profile：未来允许跨失败/章节保留的档案结果；具体保留规则由 Archive/Progression GDD 决定；
- campaign-settings：音量、文字、动效和输入偏好。

Prototype namespace 不读取、不迁移、不删除。正式 key 必须含 revival-archives-campaign 前缀和 schema version。

### 3.2 Save envelope

每份 Campaign save 至少包含：

- schemaVersion；
- contentVersion；
- campaignId；
- checkpointId；
- stateRevision；
- savedAt；
- payload；
- integrity metadata，用于检测截断或结构损坏。

savedAt 只用于向玩家解释备份时间，不能参与 gameplay rule。

### 3.3 Write boundary

- 只保存 Campaign State 已原子提交的 revision；
- 不保存过渡动画、pending command 或半完成 reducer；
- autosave 发生在明确 checkpoint、场景稳定落点或重大 consequence 提交后；
- 用户可手动保存的位置由章节/场景 GDD 决定，Persistence 不自行允许在危险 command 中途保存；
- 写入新 save 成功前保留上一份已验证 snapshot。

### 3.4 Load

1. parse envelope；
2. validate schema and integrity metadata；
3. identify migration path；
4. migrate copy, never mutate raw backup；
5. validate content references；
6. hand a complete state to Campaign State；
7. only then replace active snapshot。

### 3.5 Migration

- 每个 schema version 只向下一版本迁移；
- migration 必须 deterministic、可重复测试、不得依赖当前 DOM；
- 无 migration path 时保留原始数据并提供“恢复上一兼容版本 / 新建 Campaign / 导出诊断信息”中的可用选项；
- 不把 Prototype save 伪装成 Campaign v1。

### 3.6 Reset and recovery

- New Campaign、Restart Checkpoint、Delete Campaign Save、Reset Settings 是四个不同操作；
- destructive reset 明确显示影响范围并二次确认；
- 删除失败时不得显示成功；
- recovery 使用最近一份完整验证 snapshot，并告知玩家回退到哪个 checkpoint。

## 4. Formulas

### 4.1 Save eligibility

CanPersist = StateCommitted ∧ NoPendingCommand ∧ SchemaValid ∧ ContentVersionKnown。

任何一项为 false，autosave 不执行并保留上一有效 snapshot。

### 4.2 Snapshot rotation

AfterSuccessfulWrite:

- backup2 = backup1；
- backup1 = previousActive；
- active = newValidatedSnapshot。

默认保留 active + 2 backups，safe range 为 1–3 backups。存储预算不足时先释放可重建 media cache，不能静默丢掉 active。

### 4.3 Migration chain

MigrationSteps = TargetSchemaVersion − SourceSchemaVersion，仅当每个相邻版本 migration 都存在。

- version 为正整数；
- example：v2 → v5 需要 v2→v3、v3→v4、v4→v5 共 3 步；
- 任一步失败则 active 不变，迁移 copy 丢弃，raw source 保留。

### 4.4 Save size budget

TotalPersistenceBytes = Active + Backup1 + Backup2 + Profile + Settings。

首版目标不超过 2 MB，soft warning 为 1.5 MB，hard project budget 为 4 MB。超预算必须检查是否误存正文重复、媒体、event 无限历史或 DOM 数据。

## 5. Edge Cases

- JSON parse failure：尝试 backup1，再尝试 backup2；全部失败则保留原数据并进入恢复界面。
- Quota exceeded：active 不替换，显示保存失败与最近成功 checkpoint。
- Content version newer than runtime：拒绝降级加载，避免静默删除未知字段。
- Content record removed：migration 必须提供替代或明确不兼容，不能随意忽略。
- Settings corrupt but save valid：只恢复 settings 默认，Campaign state 保留。
- Save corrupt but settings valid：settings 保留。
- Two tabs write same campaign：使用 stateRevision 检测 stale write，后到的旧 revision 不覆盖新 revision。
- Browser private mode clears storage：首次开始时说明本地存储限制；不能声称云端恢复。
- Player opens Huaiyinli Prototype：两个应用 namespace 互不读取或删除。
- Death/failure persistence：Persistence 只保存上游明确标记的 profile/archive fields，不自行决定哪些知识永久保留。

## 6. Dependencies

| Dependency | This system needs | Other system needs from this |
|---|---|---|
| Campaign State | Serializable committed state and revision | Save/load/checkpoint service |
| Scene & Content Registry | Content/schema versions and reference validation | Loaded content version |
| Input/Settings | Settings schema and reset behavior | Settings persistence |
| Archive & Casebook | Explicit profile fields and retention policy | Profile storage service |
| Chapter Progression | Checkpoint and chapter boundaries | Long-term state continuity |
| UI | Recovery and confirmation screens | Result states: saved, failed, migrated, recovered |

## 7. Tuning Knobs

| Knob | Default | Safe range | Effect |
|---|---|---|---|
| Backup count | 2 | 1–3 | Recovery strength vs. storage |
| Autosave debounce | 300 ms | 0–1000 ms | Batches rapid stable commits；不能跨 pending command |
| Soft size warning | 1.5 MB | 1–3 MB | Detects accidental bloat |
| Hard project budget | 4 MB | 2–5 MB | Protects browser storage margin |
| Recovery message detail | Checkpoint + time + reason | Fixed minimum | Player trust；不能隐藏数据 loss |

哪些调查知识跨失败保留不是 Persistence tuning knob，必须由 Archive/Progression 系统决定。

## 8. Acceptance Criteria

- Campaign 与 Prototype 的 storage keys、schema versions 和 reset paths 完全独立。
- refresh 后恢复最近一次 committed checkpoint，pending action 不会被保存为已完成。
- stale tab 无法用较低 revision 覆盖较高 revision。
- active 损坏时按顺序恢复 backup1/backup2，并明确告知回退点。
- migration 在相同输入上重复执行得到相同输出，且失败不改变 raw source。
- quota/write failure 不显示保存成功，也不丢失上一有效 active。
- reset settings、restart checkpoint、new campaign 和 delete save 的影响范围各自可测试。
- 存档中不包含媒体 binary、DOM、函数或重复长文本。
- 没有未经上游规则明确授权的“死亡后永久保留”字段。

## Lean Self-Review

PASS：namespace、envelope、原子写入、迁移、恢复和 reset 边界完整；未替 Archive 系统决定失败保留规则，也未迁移 Prototype 存档。
