# Design Change Impact Report

> GDD: `design/campaign/systems/spatial-scene-exploration.md`
>
> Replacement GDD: `design/campaign/systems/first-person-spatial-exploration.md`
>
> Date: 2026-08-20
>
> Review mode: lean — TD-CHANGE-IMPACT skipped
>
> Verdict: **COMPLETE**

## Change Summary

The formal Campaign changed from a desktop Web hybrid-node experience to a native desktop, first-person 3D direction using Godot 4. The previous A-model browser spike remains valid only as historical evidence that node movement and direct interaction can function; it does not validate the new runtime or immersive presentation.

### Changed sections and requirements

- Runtime: browser / TypeScript / DOM → Godot 4 native desktop direction.
- Spatial model: fixed nodes and discrete viewpoints → continuous first-person 3D space.
- Core evidence: exit and hotspot selection → distance, sight line, door state, latch progression and spatial sound.
- Input: pointer / keyboard semantic controls → first-person keyboard/mouse plus remapping and motion-sickness settings.
- Persistence: browser storage budget → Godot save medium and path still to be designed.
- First-ghost status: OPEN → 鬼锁 identity and first encounter structure LOCKED; counterplay remains OPEN.

### Unchanged principles

- Rules and authoritative state remain separate from presentation timing.
- The player must observe facts before the investigation layer records them.
- No combat-centered design, open world, MMO systems or cost-free supernatural skill tree.
- The existing Huaiyinli Web Prototype remains independent and playable.
- Accessibility alternatives cannot reveal more information than the original cue.

## ADR Impact Analysis

Loaded three ADRs after adding the proposed replacement. Two pre-existing ADRs are affected.

### ADR-001: Use the Browser as the Game Runtime

**Classification:** Likely Superseded for formal Campaign; still valid for Huaiyinli Prototype.

**Previous assumption:** The first chapter excludes free movement and can be delivered as static TypeScript, HTML and CSS.

**Current requirement:** The formal Campaign needs continuous first-person 3D distance, sight line, door and spatial-audio evidence.

**Resolution:** Scope ADR-001 to the existing Web Prototype and deprecate it for the formal Campaign. ADR-003 is the proposed replacement.

### ADR-002: Separate Deterministic State from Investigation Content

**Classification:** Needs Review.

**Previous assumption:** Pure TypeScript transitions and content modules provide the separation.

**Current requirement:** The separation still matters, but the formal runtime and script language are no longer TypeScript / DOM.

**Resolution:** Retain the architectural principle, add a Campaign scope warning and review its concrete Godot implementation after the script language and project layout are selected.

### ADR-003: Godot First-Person Desktop Runtime for the Formal Campaign

**Classification:** Proposed replacement.

**Resolution:** Records the confirmed product direction, narrow feasibility slice and known engine risks. It remains Proposed in lean mode and blocks Campaign implementation until its open implementation choices and affected GDDs are approved.

## System Artifact Impact

| Artifact | Impact | Resolution |
|---|---|---|
| `campaign-state-and-events.md` | Node/viewpoint and DOM binding may be stale | Marked Impact Review Required; deterministic state principles retained |
| `scene-content-registry.md` | Web scene/media records do not fully model 3D resources | Marked Impact Review Required |
| `input-settings-accessibility.md` | Browser focus/zoom contract is incomplete for first-person | Marked Superseded Baseline; redesign required |
| `campaign-persistence.md` | Browser storage and size budget no longer apply | Marked Superseded Baseline; redesign required |
| `spatial-scene-exploration.md` | Interaction model directly contradicted | Preserved as historical and marked Superseded |
| `first-person-spatial-exploration.md` | New formal spatial direction | Added as Working; detailed GDD pending |
| `investigation-rule-reasoning.md` | Reasoning logic remains valid; spatial dependency changed | Dependency renamed and impact statuses recorded |
| `art-bible.md` | 2D/Web asset budgets and composition no longer complete | Marked Impact Review Required; old budgets labeled historical |
| `systems-map.md` | Statuses, dependencies and risks changed | Updated to the first-person/Godot rebaseline |

## Traceability Resolution

`docs/architecture/architecture-traceability.md` does not exist and `tr-registry.yaml` has no active requirement IDs, so no requirement IDs were removed, renumbered or silently reassigned.

## Follow-Up

1. Resolve 鬼锁 detection, intervention, rescue and defense as a playable rule.
2. Complete and review the first-person spatial GDD.
3. Redesign input/accessibility and persistence contracts for the selected Godot version.
4. Accept or revise ADR-003 before creating the formal Campaign project.
5. Only then build the bounded first-person feasibility slice.
