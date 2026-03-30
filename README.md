# The Countries

![Design preview for the REST Countries API with color theme switcher coding challenge](./preview.jpg)

A React, TypeScript, and Vite implementation of the [Frontend Mentor REST Countries API with color theme switcher challenge](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

Built with **React**, **TypeScript**, and **Vite**, this project places an emphasis on **clean frontend architecture**, **accessible UI**, and **responsive design**.

The goal of this implementation was to build a clean, accessible, and maintainable solution to the challenge while keeping the architecture simple and explicit.

## Overview

This app integrates with the [REST Countries API](https://restcountries.com) and lets users:

* browse all countries on the home page
* search countries by name
* filter countries by region
* open a country details page
* navigate through bordering countries
* switch between light and dark themes

## Links

* Repository: [https://github.com/ferfalcon/the-countries](https://github.com/ferfalcon/the-countries)
* Live site: [https://the-countries.vercel.app/](https://the-countries.vercel.app/)

## Built with

* React 19
* TypeScript
* Vite
* React Router (Declarative mode)
* CSS Modules
* CSS custom properties for theming
* Native `fetch`
* Vitest + Testing Library
* ESLint + Prettier

## Features

* Countries list page powered by the REST Countries API
* Local search by country name
* Local filtering by region
* Dedicated country details route
* Border-country navigation
* Light and dark theme support
* Loading, error, empty, and not-found states
* Keyboard-accessible controls and visible focus styles

## Architecture

The app keeps a strict UI-model boundary:

```text
API response -> mapper -> frontend model -> UI
```

This prevents raw API shapes from leaking into presentational components and keeps the UI easier to reason about and test.

The project separates API access, data mapping, and UI rendering so components can stay focused on presentation and route-level state.

### Project structure

```text
src/
  app/                  # app bootstrap and router wiring
  pages/                # route-level orchestration components
  features/
    countries/          # API, raw types, mappers, models, hooks, filters
    theme/              # theme state, persistence, DOM application
  components/           # layout, country UI, and small shared UI pieces
  styles/               # global styles and design tokens
```

### Architecture highlights

* **Route-level orchestration** keeps page components responsible for screen state
* **Feature boundaries** keep countries logic separate from theme logic
* **Mapper layer** isolates raw API responses from UI models
* **Pure filtering utilities** keep home-page behavior simple and testable
* **Presentational components** receive normalized data through props

## Accessibility

Accessibility was treated as a core part of the implementation, not an afterthought.

Highlights include:

* semantic landmarks and route-level headings
* properly labeled search and filter controls
* visible focus states across links, buttons, inputs, and cards
* meaningful flag alt text with safe fallbacks
* keyboard-friendly card, border-link, and back-button interactions
* clear status messaging for loading, empty, error, and not-found states

## Testing

Focused tests cover the most important pure logic in the app:

* country filtering
* country summary mapping
* country details mapping
* theme provider behavior

Run the test suite with:

```bash
npm test
```

## Running locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run type checking:

```bash
npm run typecheck
```

Run linting:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

## Implementation notes

This project is intentionally small in scope but strong in implementation quality. It demonstrates:

* consuming an external API without leaking raw response shapes into the UI
* building small React components with clear responsibilities
* handling route-level loading and error states cleanly
* creating a responsive, accessible interface without a component library
* keeping an MVP maintainable, readable, and production-oriented

## Author

* LinkedIn: [Fernando Falcon](https://www.linkedin.com/in/fernandofalcon/)
* Website: [ferfalcon.com](http://ferfalcon.com/)
* Frontend Mentor: [@ferfalcon](https://www.frontendmentor.io/profile/ferfalcon/)
