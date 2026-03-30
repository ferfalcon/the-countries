# Project instructions

## Project purpose

Build a portfolio-quality React + TypeScript + Vite implementation of the
Frontend Mentor “REST Countries API with color theme switcher” challenge.

Optimize for:
- correctness
- clarity
- accessibility
- maintainability
- responsive polish
- interview-friendly engineering decisions

## Tech stack

- React
- TypeScript
- Vite
- React Router (Declarative mode)
- CSS Modules
- CSS custom properties for theming
- native fetch
- Vitest + Testing Library

## Core decisions

Follow these unless the user explicitly changes them:

- Keep the app frontend-only
- Use two routes:
  - `/`
  - `/country/:code`
- Use `cca3` as the country route identifier
- Keep search term and region filter state at the home page level
- Keep theme state in a dedicated theme provider
- Keep raw API response types separate from frontend UI models
- Use a mapper layer between API responses and UI models
- Filter countries locally from the fetched list
- Resolve border countries with a bulk lookup request
- Prefer simple, explicit solutions over abstractions

## Architecture boundaries

- `src/app/`
  - app bootstrap and router wiring
- `src/pages/`
  - route-level orchestration components
- `src/features/countries/`
  - API functions, raw types, UI models, mappers, hooks, filter utils
- `src/features/theme/`
  - theme types, storage, provider, theme application logic
- `src/components/layout/`
  - shared layout pieces
- `src/components/countries/`
  - countries-specific presentational components
- `src/components/ui/`
  - tiny generic UI helpers only
- `src/styles/`
  - global styles and design tokens

Do not move feature logic into random UI components.
Do not let UI components depend directly on raw API response shapes.

## Data flow

Use this boundary:

API response -> mapper -> frontend model -> UI

Frontend models:
- `CountrySummary`
- `CountryDetails`

Raw API types stay inside `src/features/countries/`.

## Styling rules

- Use CSS Modules for component and page styles
- Use `src/styles/tokens.css` for theme and design tokens
- Use `src/styles/globals.css` for reset and base styles
- Apply theme with `data-theme` on the document root
- Prefer semantic, readable class names
- Keep styling simple and maintainable

Do not add Tailwind, Sass, CSS-in-JS, or a UI framework unless requested.

## UI rules

Always account for:
- semantic HTML
- keyboard accessibility
- visible focus states
- proper labels
- loading, error, and empty states
- graceful missing-data handling
- mobile-first responsive behavior

## Component rules

Prefer:
- small components
- page components as orchestration layers
- presentational components where possible
- pure functions for mapping and filtering

Avoid:
- giant page files
- premature abstractions
- unnecessary custom hooks
- unnecessary global state
- generic components used only once

## Implementation rules

When changing code:
- keep diffs small and focused
- preserve the agreed architecture
- follow existing naming patterns
- avoid speculative refactors
- do not add dependencies without clear justification
- add comments only when they add real value

Prefer code that is easy to explain in an interview.

## Validation

After making changes, run relevant checks when available:
- type checks
- lint
- tests

If UI behavior changes, verify the affected path directly.

## Priority order

When tradeoffs appear, prioritize:
1. correctness
2. clarity
3. accessibility
4. maintainability
5. design fidelity
6. reuse

## If unsure

Choose the simpler solution that is:
- accessible
- maintainable
- consistent with this architecture
- easy to justify in an interview