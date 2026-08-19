# ADR-002: Separate Deterministic State from Investigation Content

*Status: Accepted — 2026-08-13*

*2026-08-20 scope note:* The separation of deterministic state from authored content remains a useful principle. Its TypeScript, DOM and browser-specific implementation applies to the Huaiyinli Prototype; the formal Godot Campaign requires a follow-up architecture review before reusing it.

## Context

The game needs seven days of authored choices, cross-run archive unlocks, qualitative resurrection signs and multiple explainable endings. Embedding story text and mutable state in DOM handlers would make rule coverage and save compatibility fragile.

## Decision

Use pure TypeScript transitions for run state and persistence contracts. Keep investigation actions, evidence descriptions, day reports and ending prose in content modules. UI code may dispatch commands and render results but may not mutate gameplay state directly.

## Consequences

- Rule branches can be tested without a browser.
- Story content can expand without modifying core formulas.
- Current-run and permanent archive data require separate schemas and storage keys.
- Content validation becomes a build-time test responsibility.
