# Revival Archives — Development Handoff

*Updated: 2026-08-13*
*Audience: a new GPT Web, Codex, Claude Code, or human developer opening this repository without access to the previous conversation*

## 1. Read This First

The repository is **not** currently at full-game Production. It contains a successful gameplay prototype for a later incident, while the full game concept is being re-established from the beginning.

The next session must begin with design and product rebaselining. Do not immediately add more actions, chapters, animations, original-character cameos, combat or open-world systems.

## 2. Product Truth

### Full game

- Chinese working title: **《复苏档案》**
- English working title: **Revival Archives**
- Repository: `Cer6erusovo/revival-archives`
- Format: free, non-commercial, single-player desktop Web fan game
- World: a fan work inspired by 《神秘复苏》, with an original protagonist and original incidents
- Long-term fantasy: grow from an ordinary person into a Ghost Controller who joins the supernatural organization, handles increasingly dangerous incidents and pays escalating revival costs

### Current playable build

- Correct name: **《复苏档案：槐荫里事件》**
- Correct status: **mid-game incident gameplay prototype / vertical-slice candidate**
- Current online entry: repository Pages root
- It starts with the protagonist already controlling Ghost Shadow and holding temporary headquarters clearance.
- Therefore it cannot serve as the full game's opening chapter.
- Its seven-day structure belongs to this incident only; it is not the permanent structure of every future chapter.

## 3. Confirmed Full-Game Direction

The intended 0-to-1 player journey is:

1. The original protagonist begins as an ordinary person.
2. A first supernatural incident traps the protagonist.
3. The player observes rules and survives without supernatural power.
4. A fatal situation forces the protagonist to control Ghost Shadow.
5. The newly gained power immediately creates revival symptoms and danger.
6. The supernatural organization discovers, isolates and evaluates the protagonist.
7. The protagonist joins as a provisional investigator and gradually earns authority.
8. Subsequent original incidents grow in scale, relationships and consequences.
9. Ghost Shadow approaches revival; controlling a second ghost becomes necessary rather than a conventional upgrade.
10. The Huaiyinli incident can appear later as an important second-control incident.
11. Yang Jian may initially appear through reports and headquarters intelligence, later through support missions or shared incidents. The original protagonist must retain an independent role.

## 4. What Already Exists

The current TypeScript/Vite build implements:

- an original supernatural-headquarters terminal interface;
- internal files, manual keyword search and encrypted communications;
- direct field hotspots instead of abstract action cards;
- full-screen Ghost Shadow sequences and qualitative revival symptoms;
- optional Web Audio ambience, terminal cues and knocking;
- three actions per day over a seven-day incident;
- evidence-gated three-part rule construction;
- three endings and versioned local persistence;
- a permanent archive and a success-unlocked Doorplate ability;
- a low-intensity Yang Jian intelligence reference.

Verification already performed:

- 14 automated rule and persistence tests pass;
- TypeScript check and Vite production build pass;
- the full authored success route was replayed through the rebuilt UI;
- failure routes, refresh persistence, static hosting, keyboard actions and desktop horizontal overflow were checked;
- no page console errors were observed during the verified route.

Read `production/verification-2026-08-13.md` before claiming anything else is verified.

## 5. Known Documentation Drift

`design/gdd/game-concept.md` currently describes **《复苏档案：七日限期》** as though it were the entire game. That document is now legacy Prototype design evidence and must not be treated as the full-game concept.

`design/gdd/systems-index.md` similarly describes the seven-day incident systems, not the final long-term game system map.

They are intentionally preserved until the Concept Rebaseline produces replacements. Do not silently rewrite them during unrelated implementation work.

## 6. Exact Next Workflow

Current phase: **Concept**.

The next session should execute these steps in order:

### Step 1 — Preserve the prototype baseline

- Confirm `main` is clean and the current GitHub Pages build is reachable.
- Create a Git tag such as `prototype-huaiyinli-v0.1.0` only after checking that the deployed commit is the intended baseline.
- Do not move code or change the Pages URL during this step.

### Step 2 — Full-game Concept Rebaseline

Create a new full-game concept document. It must decide:

- protagonist identity and ordinary life before the incident;
- the first supernatural incident and its killing rule;
- how Ghost Shadow is obtained through player action;
- why the organization finds and accepts the protagonist;
- chapter structure versus individual incident structure;
- long-term power, revival, relationships and authority progression;
- where the Huaiyinli incident belongs in the campaign;
- boundaries for canon characters and copyrighted material;
- a realistic first-release scope for a first-time solo developer.

Do not assume the full game uses a seven-day clock. That clock is incident-specific unless the new concept explicitly justifies wider use.

### Step 3 — Concept review and confirmation

- Compare the new full-game concept against the confirmed journey in section 3.
- Explicitly list what the first release excludes.
- Obtain user confirmation before treating it as Approved.
- Run the appropriate Concept gate from the Claude-Code-Game-Studios workflow.

### Step 4 — Re-map systems

Only after concept approval, replace or supersede the incident-only systems map with a full-game systems map covering:

- campaign/chapter progression;
- incident framework and authored rules;
- Ghost Controller ability and revival consequences;
- organization status, permissions and relationships;
- investigation surfaces: files, search, communications and field work;
- persistent save migrations across chapters;
- prototype/gallery routing and formal game routing.

Avoid MMO systems, multiplayer, combat grinding and a large open world.

### Step 5 — Design the true opening vertical slice

The next playable feature should cover:

```text
ordinary life
→ first supernatural incident
→ powerless observation and escape
→ forced Ghost Shadow control
→ first revival consequence
→ organization contact
```

Design it before implementation. The player must perform the transition; it cannot be summarized in exposition.

### Step 6 — Plan the repository split

After the opening design is approved, propose—but do not blindly execute—a migration such as:

```text
/                         formal project landing or game entry
/prototype/huaiyinli/     preserved Huaiyinli playable build
src/campaign/             full-game campaign shell
src/incidents/            reusable incident content boundaries
src/prototype/            Huaiyinli-specific presentation/content if isolated
design/narrative/         protagonist, chapter and incident narrative specs
```

The migration must preserve the existing playable URL or provide a documented redirect and must include save compatibility decisions.

## 7. Explicit Non-Goals for the Next Session

Do not start with any of the following:

- adding more Huaiyinli days or rooms;
- creating a city-management or MMO layer;
- implementing combat, equipment rarity or conventional leveling;
- making Yang Jian the protagonist;
- copying official logos, commercial artwork, novel text or soundtrack;
- refactoring working code only to make directories look cleaner;
- announcing the current Prototype as a content-complete game;
- entering Polish or Release before the full-game concept is approved.

## 8. Git and Release Facts

- Main project remote: `git@github.com:Cer6erusovo/revival-archives.git`
- Framework upstream: `https://github.com/Donchitos/Claude-Code-Game-Studios.git`
- Default branch: `main`
- GitHub Pages workflow: `.github/workflows/deploy-pages.yml`
- Local generated `dist/` and `node_modules/` are ignored and must not be committed.
- The workflow runs tests and a fresh Vite build before publishing.

Before any push, recheck branch, remote, staged files, untracked files and workflow results.

## 9. Useful Commands

```bash
npm ci
npm test
npm run build
npm run dev
git status --short
git remote -v
```

## 10. First Response Recommended for the Next GPT

After reading this file and inspecting the repository, the next GPT should tell the user approximately:

> 我已经确认当前仓库保存的是“槐荫里事件”玩法 Prototype，完整游戏已退回 Concept 阶段。下一步先冻结并标记 Prototype 基线，然后重新设计《复苏档案》的正式开场：普通人遭遇灵异、驾驭鬼影、被灵异组织接触。此时不继续扩写槐荫里，也不先重构目录。

It should then begin the Concept Rebaseline workflow, asking only the product decisions that materially change the opening design.
