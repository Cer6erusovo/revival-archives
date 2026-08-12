# Public Repository Structure

This repository keeps the playable Web game, design evidence, tests and the
Claude-Code-Game-Studios workflow in one project. Generated output and local
session state are not committed.

## Published game

| Path | Purpose | Commit? | Published to Pages? |
| --- | --- | --- | --- |
| `index.html` | Vite application entry | Yes | Yes |
| `src/` | Game rules, authored content, UI and assets | Yes | Yes, after build |
| `tests/` | Rule and persistence tests | Yes | No |
| `package.json` / `package-lock.json` | Reproducible Web toolchain | Yes | Used during build |
| `vite.config.ts` / `tsconfig.json` | Build and type-check configuration | Yes | Used during build |
| `.github/workflows/deploy-pages.yml` | GitHub Pages build and deployment | Yes | Controls publishing |

## Design and production evidence

| Path | Purpose | Commit? |
| --- | --- | --- |
| `design/gdd/` | Approved concept and system boundaries | Yes |
| `design/art/` | Original visual rules and asset standards | Yes |
| `docs/architecture/` | Technical decisions | Yes |
| `production/verification-*.md` | Evidence from automated and browser checks | Yes |
| `prototypes/` | Historical throwaway interaction prototypes | Yes |

## Local or generated only

The following must remain ignored:

- `node_modules/` — installed dependencies.
- `dist/` — generated production build; GitHub Actions rebuilds it.
- `.vite/`, `coverage/`, `*.tsbuildinfo` — tool caches and test output.
- `production/session-state/*` and `production/session-logs/` — machine-local workflow state.
- `.env*`, keys, credentials and secrets — never commit private configuration.

The exception `production/session-state/.gitkeep` preserves the expected empty
directory in a fresh clone.

## Repository and Pages naming

Recommended GitHub repository slug:

```text
revival-archives
```

Recommended display title:

```text
Revival Archive: Seven-Day Deadline
```

The repository description must state that it is a free, non-commercial fan
project. The selected name avoids presenting the repository as the official or
comprehensive home of the original work.

After creating the new GitHub repository, preserve the framework source remote
as `upstream` and use the new project repository as `origin`:

```bash
git remote rename origin upstream
git remote add origin git@github.com:Cer6erusovo/revival-archives.git
```

The public game URL will then be:

```text
https://cer6erusovo.github.io/revival-archives/
```
