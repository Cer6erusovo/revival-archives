# Campaign Spatial Prototype A — Validation Report

> Date: 2026-08-17
>
> Verdict: **SPIKE COMPLETE — functional evidence only**
>
> Scope: isolated formal Campaign interaction study; not the shipped Huaiyinli Prototype

## Classification correction

该产物是一次偏离正式 Phase 2 顺序的 interaction spike。它使用占位构图和硬编码内容，只能证明 A 模型的交互链在浏览器中可运行；它不是 Concept Prototype 的正式门禁，也不是 Vertical Slice，不能用于判断现场感、恐怖氛围、美术质量或正式制作可行性。

## Hypothesis

固定空间节点加节点内有限转向、手电和直接交互，能否让 Web 游戏产生“人在现场”的空间感，同时保持个人项目可控，并承载规则解密与无血条遭遇。

## Implemented slice

- 教室后门 → 五楼走廊 → 西楼梯的平台移动；
- 节点内左右转向、鼠标手电、物体热点和实体出口；
- 首次记录消防栓裂纹，移动后再次比对同一锚点；
- 从个人记录中排除错误解释并形成“出口重复”假设；
- 再次移动验证假设，触发队尾异常；
- 通过示警、保护或观察处理遭遇，不显示生命值、伤害或攻击数值；
- 键盘操作、静音、文字反馈和 reduced-motion CSS 契约。

## Browser validation

使用真实 Chromium 路径完成验证：

1. 进入教室后门，移动至走廊和西楼梯；
2. 使用方向键原地转向并回看上一段路线；
3. 主动记录消防栓锚点，向下移动后确认重复；
4. 在个人记录中选择错误假设，收到基于已知事实的反证；
5. 选择正确空间假设，并通过下一次移动承担验证风险；
6. 发现队尾异常，使用手电确认，再选择“保护”完成遭遇；
7. 结算正确记录 4 次移动、3 次主动观察、空间出口重复与保护选择；
8. `F`、`M`、`N` 快捷键在按钮保有焦点时可用；
9. 1200px 桌面视口与 390px 窄屏均无横向溢出；
10. 浏览器控制台 0 error、0 warning。

浏览器验证中发现并修复了三项基础问题：透明转场层拦截出口点击、按钮保有焦点时快捷键失效、390px 窄屏发生横向裁切。

## Result

自动与浏览器层面的功能假设成立：A 模型能够把基础行走、观察、规则推断和遭遇放在同一空间界面内，没有退化为纯卡片翻页，也没有引入自由移动的制作成本。

没有被验证的是主观体验：恐怖氛围、现场感、美术可信度、动画重量、声音空间和信息密度。占位画面无法提供这些问题所需的代表性质量，因此不应把该产物交给用户做体验结论。

## Boundaries retained

- 没有修改 `src/`、正式入口、存档或 GitHub Pages；
- 没有定义主角第一只鬼；
- 没有续写第五幕；
- 队尾异常只是交互占位，不是新的正式剧情结论。

## Correct workflow handoff

1. 回到 Systems Design，补齐并评审 Spatial Scene Exploration GDD；
2. 继续 Investigation & Rule Reasoning 等剩余 MVP system GDD；
3. 完成 Systems Design gate 与 Technical Setup；
4. 到 Pre-Production 制作 3–5 分钟、具有代表性场景美术/动画/声音的 Vertical Slice；
5. 只有该 Vertical Slice 才进入无指导的人类现场感与核心幻想体验。
