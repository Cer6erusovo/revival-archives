# Revival Archives — Current Handoff

*Updated: 2026-08-16*
*Stage: Systems Design*
*Review mode: lean*

## Read first

完整事实不再集中塞在一个 HANDOFF 里。先读：

1. `AGENTS.md`
2. `design/campaign/README.md`
3. `design/campaign/CURRENT-LOCKED-BASELINE.md`
4. `design/campaign/game-concept.md`
5. `design/campaign/art-bible.md`
6. `design/campaign/systems-map.md`
7. `design/campaign/concept-baseline.md`
8. `design/campaign/chapters/ch01-seven-high-school.md`
9. `design/campaign/decisions/decision-log.md`

## Current truth

- 现有可玩版本《复苏档案：槐荫里事件》是中期玩法 Prototype，不是正式开场。
- Prototype 的“鬼影”叙事已与正式 Campaign 冲突：杨间后续掌握鬼影，因此只保留 Prototype 的玩法验证价值。
- 正式 Campaign 从七中敲门鬼事件开始。
- 原创主角与杨间同校、邻近班级；同一晚走不同逃亡路线，各自成为驭鬼者。
- 主角第一只鬼当前为 **OPEN**；“死锁 / 关系锚定”已经撤销，只保留为候选历史。
- 第一章场景与剧情已经主动暂停在第五幕旧后勤区域入口；未经用户明确重开，不继续生成第一只鬼或后续剧情。
- 白月光在七中失踪；后续利用原著饿死鬼阶段杨间再次返回七中的节点重新出现线索；很后期真实重逢时她已不是正常人。
- Campaign Concept gate 已于 2026-08-16 通过；Art Bible、Systems Map 和四个 Foundation baselines 已建立。

## Current design position

第一章目前已锁定到：

- 事件前一周普通校园生活；
- 一个没有灵异预兆的美好周末；
- 晚八点晚自习进入七中事件；具体年份和星期均不锁定；
- 第一幕：晚自习、周正进入杨间班、主角只在上课前可能看见周正；
- 第二幕：鬼域侵蚀、腐朽与异常黑暗；
- 第三幕：五楼撤离、坍塌导致主角与杨间路线自然分开、西楼梯无限下行、主角与白月光处于“同一位置的不同空间”。
- 第四幕：通讯中断、鬼奴混入队尾并拖走学生、队伍转而向上，最终打开一道防火门。
- 第五幕入口：防火门通往七中真实存在但长期封闭的旧后勤区域；第一只鬼位于其中，但身份与规律仍为 OPEN。

第三幕结尾为电话中的两人都确认自己在西楼梯，镜头展示相同楼梯坐标上的两个不同空间；随后通讯失真并中断。

**当前流程：Systems Design。** Campaign State & Event、Scene & Content Registry、Input/Accessibility、Campaign Persistence 已形成 lean baseline。下一步必须先确定 Spatial Scene Exploration 的玩家交互模型，再写该系统 GDD 和最小校园空间原型。不要继续 Act 5、第一只鬼、第二章或 Campaign 代码。

## Existing prototype verification

现有 Prototype 曾完成 14 个自动测试、TypeScript/Vite build 和完整成功路线回放。详情见 `production/verification-2026-08-13.md`。设计重构不等于这些实现验证失效，但也不代表 Prototype 剧情进入正式正史。
