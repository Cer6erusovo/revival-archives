# ADR-003: Godot First-Person Desktop Runtime for the Formal Campaign

## Status

Proposed — 2026-08-20. Product direction is locked; this ADR remains Proposed because the project uses lean review and no technical gate has accepted the implementation details.

## Date

2026-08-20

## Engine Compatibility

| Field | Value |
|-------|-------|
| **Engine** | Godot 4 family; evaluated against repository reference Godot 4.6 |
| **Domain** | Core / Rendering / Input / Audio |
| **Knowledge Risk** | HIGH — repository reference is post-cutoff |
| **References Consulted** | `docs/engine-reference/godot/VERSION.md`, `modules/rendering.md`, `modules/input.md`, `breaking-changes.md`, `deprecated-apis.md` |
| **Post-Cutoff APIs Used** | None — no implementation API is selected in this ADR |
| **Verification Required** | Confirm exact engine minor version, Windows rendering backend, input/focus behavior, desktop export and first-person feasibility slice before formal production |

The current 4.6 reference notes D3D12 as the Windows default, the 4.6 dual-focus input change and several post-cutoff rendering changes. Implementation must verify these against the pinned engine rather than rely on model memory.

## ADR Dependencies

| Field | Value |
|-------|-------|
| **Depends On** | None |
| **Enables** | First-person Input/Accessibility redesign, Godot Persistence redesign, Field Interaction Presentation architecture |
| **Blocks** | Formal first-person feasibility slice and any Campaign code migration until Accepted |
| **Ordering Note** | Preserve the current Web Prototype; establish a separate Godot project only after this ADR and the affected system GDDs are approved |

## Context

### Problem Statement

The previous browser/DOM and hybrid-node direction can represent scene choices, but the confirmed first-ghost encounter now depends on continuous spatial evidence: a corridor serving several rooms, the player's distance from a closing door, victims visible through door glass, the progression of a latch, and directional sound that creates rescue pressure. A placeholder browser spike proved interaction flow but did not prove presence or atmosphere.

### Constraints

- Solo, first-time formal game development; scope must stay narrow.
- Free, non-commercial fan project using only original or properly licensed assets.
- No combat-centered design, open world, networking or physics sandbox.
- Existing TypeScript/Vite Huaiyinli Prototype remains playable and is not migrated in place.
- Motion-sickness, subtitle, remapping and non-audio information requirements must be designed before production.
- Exact script language, project layout, target hardware and first shipping desktop OS remain open.

### Requirements

- Continuous first-person 3D movement and looking in small authored spaces.
- Direct, readable interaction with doors, door glass, latches, characters and flashlight.
- Positional audio and controlled lighting without making required clues unreadable.
- Deterministic rule outcomes separated from presentation timing.
- A small feasibility slice before a complete chapter or asset pipeline is committed.

## Decision

Use Godot 4 as the formal Campaign engine and target a native desktop, first-person 3D experience. Build the Campaign as a separate project boundary from the existing Web Prototype. Do not translate the current DOM/node implementation or browser save format directly.

The first implementation gate is not a full chapter. It is a narrow feasibility slice containing one corridor, two classrooms, toilet stalls, a glazed door, one trapped character and one complete unlocked-to-locked sequence with flashlight and spatial audio. Passing the gate requires players to perceive lock progression and rescue urgency without a large explanatory UI prompt.

### Architecture Diagram

~~~text
Existing Web Prototype (retained, independent)

Formal Godot Campaign
  Authored 3D Scene + Actors + Audio
                 |
          Player command / observation
                 v
       Deterministic rule and state boundary
                 |
          Committed outcome events
                 v
       3D / audio / UI presentation feedback
~~~

### Key Interfaces

No code interface is locked by this ADR. Future architecture must define:

- player intent / interaction commands;
- authoritative door and supernatural-lock states;
- outcome events consumed by animation, audio and UI;
- content IDs and save boundaries;
- accessibility settings that affect presentation without changing rule truth.

## Alternatives Considered

### Alternative 1: Keep the TypeScript/DOM Hybrid-Node Campaign

- **Description:** Continue the approved fixed-node and discrete-viewpoint model.
- **Pros:** Reuses current Web tooling, tests and deployment; lowest engine-learning cost.
- **Cons:** Door distance, continuous line of sight, latch progression and outside rescue pressure require increasingly artificial cuts and UI mediation.
- **Rejection Reason:** It no longer matches the confirmed spatial expression of the Ghost Lock encounter.

### Alternative 2: Browser 3D or Godot Web Export

- **Description:** Keep browser delivery while adding continuous 3D rendering.
- **Pros:** Link-based distribution and potential continuity with GitHub Pages.
- **Cons:** Retains browser delivery constraints while still paying most 3D production costs; does not reuse the DOM spike as a finished experience.
- **Rejection Reason:** Native desktop is the confirmed product direction; Web distribution is not a current requirement for the formal Campaign.

### Alternative 3: Unity or Unreal Native Desktop

- **Description:** Use another general-purpose 3D engine.
- **Pros:** Both can support the required first-person scene, animation, lighting and audio.
- **Cons:** The project has no confirmed dependency that requires either engine; changing to them would add a separate tooling and workflow decision.
- **Rejection Reason:** Godot 4 is the confirmed default. Reopen only if a concrete feasibility blocker appears.

## Consequences

### Positive

- Space, sight lines, door glass, distance and directional sound can become actual evidence.
- The Ghost Lock rescue problem can be tested as world interaction instead of card or button logic.
- Existing Godot reference material and CCGS engine-specialist workflow can guide later implementation.

### Negative

- 3D environments, characters, animation, lighting and audio become major production costs.
- Previously approved Web input, persistence, scene registry and spatial contracts require impact review or redesign.
- The current browser build and automated tests do not validate the new runtime.

### Risks

- **Empty 3D risk:** first-person walking without representative assets may still have no presence. Mitigation: judge the narrow slice on readable lock progression and rescue urgency, not locomotion alone.
- **Scope growth:** a 3D school may expand into an open campus. Mitigation: keep the first slice to one corridor, two classrooms and toilet stalls.
- **Motion sickness:** head bob, field of view and camera effects may exclude players. Mitigation: define settings before production and require an information-equivalent reduced-motion path.
- **Engine drift:** the repository's Godot 4.6 reference is post-cutoff. Mitigation: pin the actual minor version and verify all selected APIs and export behavior before implementation.

## GDD Requirements Addressed

| GDD System | Requirement | How This ADR Addresses It |
|------------|-------------|--------------------------|
| `game-concept.md` | Formal Campaign is a first-person 3D desktop rule-investigation horror game | Selects Godot 4 native desktop as the target runtime |
| `first-person-spatial-exploration.md` | Distance, sight line, door state and spatial sound must carry rule information | Provides a continuous 3D runtime and a bounded feasibility gate |
| `ghost-lock.md` | Players must perceive a room closing and locking while seeing a trapped victim through glass | Defines the exact minimum scene used to verify that expression |

## Related ADRs

- Deprecates ADR-001 for the formal Campaign; ADR-001 remains valid for the Huaiyinli Web Prototype.
- Requires follow-up review of ADR-002 before its TypeScript implementation assumptions are reused in Godot.
