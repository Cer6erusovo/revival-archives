# Revival Archives — Current Handoff

*Updated: 2026-08-20*
*Stage: Systems Design rebaseline*
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
- 主角第一只鬼确定为 **鬼锁**；“死锁 / 关系锚定”和“拆分完整鬼 / 旧伤重演”均为已撤销或否决历史。
- 第一章已经重开到旧教室区域的第一轮鬼锁猎杀与厕所隔间提示；破解、救援、防御、驾驭和其后剧情仍未锁定。
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
- 第五幕入口：防火门通往七中真实存在但长期封闭的旧校舍区域，当前 playable 构成为老旧教室走廊、多间教室与厕所。
- 第一轮鬼锁事件：先进入教室休息的一批学生被逐间关门落锁、逐间猎杀，第一批全灭；门外可隔玻璃看见门内，但很难打开。
- 主角不会直接解出规律；当厕所隔间门再次被关闭并准备落锁时，他才初步怀疑“关门 / 落锁是猎杀标志”。

第三幕结尾为电话中的两人都确认自己在西楼梯，镜头展示相同楼梯坐标上的两个不同空间；随后通讯失真并中断。

**当前流程：Systems Design rebaseline。** 正式 Campaign 已确认转为 Godot 4 第一人称 3D 桌面游戏。旧 Foundation 1–4 与 A 混合节点 Spatial GDD 的评审只保留为 Web 历史证据；空间、输入、存档、表现和架构必须按新方向复审。不要修改或迁移现有 `src/`。

下一项需要用户参与的设计决策是鬼锁的游戏化 counterplay：玩家怎样识别灵异落锁、怎样在落锁完成前介入、怎样从门外救人、怎样防御，以及失败如何清楚表现。未确认前不得直接制作 Godot 关卡或把堵门 / 砸锁 / QTE 写成答案。

## Existing prototype verification

现有 Prototype 曾完成 14 个自动测试、TypeScript/Vite build 和完整成功路线回放。详情见 `production/verification-2026-08-13.md`。设计重构不等于这些实现验证失效，但也不代表 Prototype 剧情进入正式正史。
