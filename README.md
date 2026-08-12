# Revival Archives / 复苏档案

《神秘复苏》世界观下的非商业单人 Web 同人游戏项目。

> 本项目不是官方作品，也不代表获得原作者、出版方或改编作品权利方授权。项目不复制小说原文，不使用官方或商业美术、Logo 和音频素材。

## 当前状态

仓库目前包含一个可玩的中期事件 Prototype：

**《复苏档案：槐荫里事件》**

它用于验证：

- 总部终端式调查；
- 关键词检索、现场热点与规律组合；
- 使用鬼影换取情报并承担复苏代价；
- 七日行动预算、失败结局和二次驾驭。

它不是正式游戏的开场，也不是完整游戏的名称。正式游戏将从原创主角作为普通人第一次遭遇灵异开始，逐步经历驾驭厉鬼、被灵异组织接触、加入组织并处理更多事件。

## 在线试玩

[GitHub Pages 试玩入口](https://cer6erusovo.github.io/revival-archives/)

如果页面尚未发布，请在仓库 **Settings → Pages** 中将 Source 设置为 **GitHub Actions**。

## 给下一位开发者或 AI

开始任何规划或开发前，必须完整阅读：

1. [HANDOFF.md](HANDOFF.md) — 当前事实、产品重定位和严格的下一步顺序；
2. [GAME-README.md](GAME-README.md) — Prototype 的运行、交互和发布方式；
3. [production/verification-2026-08-13.md](production/verification-2026-08-13.md) — 已验证与尚未验证的边界。

不要直接扩写槐荫里事件。当前阶段已经回到正式游戏的 **Concept Rebaseline**。

## 本地运行

```bash
npm ci
npm run dev
```

验证与构建：

```bash
npm test
npm run build
```

## 主要目录

```text
src/                 当前槐荫里 Prototype 的正式实现
tests/               规则与存档测试
design/gdd/          现有设计；七日概念将降级为 Prototype 设计
design/art/          原创视觉规则
docs/                架构、流程和公开目录说明
production/          阶段与验证证据
prototypes/          更早期的鬼影试探实验
.claude/             Claude-Code-Game-Studios 工作流
```

详细目录边界见 [docs/project-structure.md](docs/project-structure.md)。

## 框架来源

本项目基于 [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) 建立。原框架远端在本地保留为 `upstream`。
