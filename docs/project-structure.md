# Repository Structure

本仓库同时保存：正式 Campaign 设计、当前槐荫里 Prototype、Claude-Code-Game-Studios 工作流和验证证据。

## 当前事实源

| Path | Purpose |
| --- | --- |
| `AGENTS.md` | 跨 GPT/Codex/Claude 的统一协作规则 |
| `design/campaign/CURRENT-LOCKED-BASELINE.md` | 当前最高优先级的正式游戏设计基线 |
| `design/campaign/game-concept.md` | 正式 Campaign 产品概念与范围 |
| `design/campaign/art-bible.md` | 正式 Campaign 视觉与资产约束 |
| `design/campaign/systems-map.md` | 正式 Campaign 系统边界、依赖和设计顺序 |
| `design/campaign/systems/` | 正式 Campaign 单系统设计基线 |
| `design/campaign/` | 正式游戏的分主题设计文档 |
| `design/campaign/decisions/` | 决策原因、否决方案，防止 AI 反复带偏 |
| `design/campaign/canon/` | 原著锚点与能力撞车检查 |
| `HANDOFF.md` | 当前推进位置，不再承载全部设定 |

## 当前可运行 Prototype

| Path | Purpose |
| --- | --- |
| `index.html` | 当前 Vite 入口 |
| `src/` | 槐荫里 Prototype 正式实现 |
| `tests/` | 当前规则与存档测试 |
| `design/gdd/` | Legacy 槐荫里设计证据，不能当正式 Campaign GDD |
| `production/verification-2026-08-13.md` | 已完成验证 |
| `production/gate-checks/` | 正式 Campaign 阶段门检查证据 |

## 未来实现结构

目标而非立即迁移，见 `docs/architecture/target-project-layout.md`。

原则：先把 Campaign 设计和知识边界分清，再迁代码。不要为了目录看起来漂亮而破坏现有 Pages、测试和存档。

## Generated / local only

继续忽略：`node_modules/`、`dist/`、`.vite/`、`coverage/`、`*.tsbuildinfo`、本地 session logs、`.env*` 和凭据。
