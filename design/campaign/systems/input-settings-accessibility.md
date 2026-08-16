# System GDD: Input, Settings & Accessibility Contract

> Status: APPROVED — lean formal review 2026-08-17
>
> Created: 2026-08-16
>
> System map ID: 3
>
> Scope: Formal Campaign only

## 1. Overview

本系统定义正式 Campaign 所有玩家界面必须遵守的输入、焦点、文本、声音、动效和恢复行为。它不是最后补上的“无障碍菜单”，而是 Field UI、Archive、Audio 和场景交互共同依赖的基础契约。

标准数值以 WCAG 2.2 AA 为当前 Web 基线，项目可做得更高，但不能以恐怖氛围为由降低必要信息可用性。

## 2. Player Fantasy

玩家应把注意力放在空间和规律上，而不是和界面搏斗。无论使用鼠标还是键盘、开启静音还是 reduced motion，玩家都能获得完成核心推理所需的信息和操作路径。

## Game Feel

输入应当“安静、直接、可预期”：主要 control 在输入后 100 ms 内显示 focus、pressed 或 pending 状态，普通反馈在 120–220 ms 内稳定；键盘与 pointer 使用同一 command，不产生轻重不同的结果。设置调整立即预览但不改变 gameplay state。无障碍替代不是简化版模式：静音、reduced motion 和 keyboard-only 仍保留相同的信息时序、危险语义与行动后果。

## 3. Detailed Rules

### 3.1 Input equivalence

- 每个核心 action 必须同时可由 pointer 和 keyboard 完成。
- hover 只能补充信息，不能是发现必要线索或操作的唯一方式。
- drag action 必须有不拖动的等价 control。
- keyboard focus order 遵循当前场景的阅读/空间顺序，并允许明确返回上一级。
- Escape 关闭可关闭 overlay；若关闭会丢失未提交选择，先显示确认。

### 3.2 Focus

- 所有可交互元素使用原生语义元素或等价可访问语义。
- focus indicator 始终可见，不被 sticky panel、dialog 或氛围层完全遮挡。
- modal 打开时 focus 进入 modal，关闭后返回触发元素或合理替代位置。
- 场景切换后 focus 进入场景标题或主要操作区，不能落到已卸载元素。

### 3.3 Text and layout

- 默认正文目标不低于 16 CSS px；
- 200% browser zoom 下不丢失核心文本、操作和状态；
- 长文本不覆盖关键场景；提供可滚动的独立阅读层；
- 颜色、位置、方向或声音不能作为唯一说明方式；
- 文案使用可理解动词，不用纯图标或不解释的神秘符号承担核心操作。

### 3.4 Audio

- 浏览器未授权 audio 时，游戏仍可开始和继续；
- 首次需要声音前提供明确启用动作，不诱导点击；
- 提供 master、ambient 和 cue 音量，支持 mute；
- 关键空间声音有视觉/文本备份，但备份只说明可感知现象，不直接给出规律答案；
- 音量设置保存在 settings layer，不属于剧情存档。

### 3.5 Motion and flashing

- 尊重 prefers-reduced-motion，并提供游戏内 override；
- reduced motion 下取消视差、抖动、循环 glitch 和长过渡；
- 不使用快速频闪作为灵异反馈；
- 必要状态变化使用瞬时边界、文字或静态构图替代。

### 3.6 Settings behavior

- settings 可在标题页和游戏内访问；
- 调整文字、音量、动效后立即预览，不改变 gameplay state；
- reset settings 与 reset Campaign save 完全分开；
- 若设置损坏，恢复安全默认值并保留 Campaign state。

## 4. Formulas

### 4.1 Text contrast

ContrastRatio = (L_lighter + 0.05) / (L_darker + 0.05)。

- ordinary text：至少 4.5:1；
- large text：至少 3:1；
- L：sRGB 转换后的 relative luminance，range 0–1；
- example：对比度工具测得 5.2:1 的正文组合通过 ordinary text target。

### 4.2 Pointer target

TargetWidth ≥ 24 CSS px 且 TargetHeight ≥ 24 CSS px；若不足，必须满足 WCAG spacing/equivalent exception。

项目推荐主要场景 action 使用至少 36 CSS px 的有效高度，safe range 36–56 CSS px；24 CSS px 只作为标准底线，不作为设计目标。

### 4.3 Motion duration

- routine feedback：120–220 ms；
- scene transition：300–700 ms；
- reduced-motion replacement：0–100 ms；
- timing 不影响 command result，只影响 presentation。

### 4.4 Volume

EffectiveGain = MasterGain × ChannelGain。

- each gain range：0.0–1.0；
- default：Master 0.8，Ambient 0.55，Cue 0.8；
- example：0.8 × 0.55 = 0.44 ambient effective gain。

默认值只是首版听感起点，必须经过设备试听再调整。

## 5. Edge Cases

- Audio permission denied：显示 muted/disabled 状态，所有核心动作仍可继续。
- Keyboard focus target removed：把 focus 移到最近有效 heading 或 scene action region。
- Zoom causes overlay overflow：overlay 内部滚动，关闭按钮保持可见，不锁死页面。
- Reduced motion changed mid-transition：立即完成到稳定 end state。
- Screen reader announces visual anomaly：只描述玩家角色当前能够感知的现象，不泄露隐藏规则。
- Color theme override conflicts with danger red：危险同时保留图形和文字标签。
- Settings schema old/corrupt：迁移或恢复单项默认，不清除 Campaign save。
- Repeated key activation：单次 command pending 时禁用重复提交，但焦点保持并反馈处理中状态。

## 6. Dependencies

| Dependency | This system needs | Other system needs from this |
|---|---|---|
| Technical preferences | Platform and Web budgets | Concrete accessibility/input baseline |
| Campaign State | No gameplay ownership | Command pending/result state conventions |
| Persistence | Settings storage service | Settings schema and separation rules |
| Spatial Exploration | Final scene interaction semantics | Keyboard/pointer/focus constraints |
| Field UI | Component inventory | Required input and focus behavior |
| Archive | Reading and navigation patterns | Text, zoom and focus rules |
| Audio | Channel inventory | Permission, volume and alternate cue rules |
| Art Bible | Color/motion language | Contrast and reduced-motion boundaries |

## 7. Tuning Knobs

| Knob | Default | Safe range | Effect |
|---|---|---|---|
| Body text size | 16 CSS px | 16–22 CSS px | Reading density and fatigue |
| Main action height | 40 CSS px | 36–56 CSS px | Pointer accuracy and layout density |
| Focus scroll padding | 24 CSS px | 16–64 CSS px | Prevents sticky UI obscuring focus |
| Routine transition | 180 ms | 120–220 ms | Responsiveness |
| Scene transition | 450 ms | 300–700 ms | Atmosphere vs. pace |
| Default master gain | 0.8 | 0.5–1.0 | Initial loudness |

Contrast minimum、keyboard equivalence、focus visibility 和 non-audio fallback 不是 tuning knobs。

## 8. Acceptance Criteria

- 只用 keyboard 可完成标题页、场景核心路径、档案查看、设置和保存/退出。
- pointer 与 keyboard 对同一 action 产生相同 command，不存在 hover-only 必要线索。
- 自动检查和人工走查确认普通正文至少 4.5:1，大文本至少 3:1。
- 主要 controls 达到项目 36 CSS px 目标；任何低于 24 CSS px 的目标有合规 exception 证据。
- focus 不会被 sticky/overlay 完全遮挡，modal 关闭后返回合理位置。
- 200% zoom 下核心文本和操作无水平锁死或不可达内容。
- 禁用 audio 后仍可完成所有核心推理；关键声音出现同步非听觉现象。
- prefers-reduced-motion 下没有循环 glitch、视差、抖动和长强制过渡。
- reset settings 不改变 Campaign save；reset Campaign 不改变用户 settings。

## Lean Self-Review

PASS：输入、焦点、文本、音频、动效和设置边界可测试，且没有预先决定场景移动模型。

## Standards References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Understanding Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
- [Understanding Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Understanding Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum)
