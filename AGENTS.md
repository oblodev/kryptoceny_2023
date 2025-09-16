# Repository Guidelines

## Project Structure & Module Organization
This Next.js app powers Kryptoceny content. Key folders: `pages/` for route components and API stubs, `components/` for reusable UI blocks, and `context/` plus `hooks/` for shared state. Data-fetch helpers live under `services/`, while static assets are served from `public/`. Styles use SASS modules in `styles/`, so import class names via `styles/Foo.module.scss` to keep scope isolated.

## Build, Test, and Development Commands
Run `npm install` once per environment. Use `npm run dev` for the local server on `http://localhost:3000`, `npm run build` for a production bundle, and `npm run start` to serve that bundle. Execute `npm run lint` before every push; it runs `eslint-config-next` and catches common accessibility or routing issues.

## Coding Style & Naming Conventions
Stick to functional React components with 2-space indentation and double quotes, mirroring existing files in `components/`. Name components and files in PascalCase (`KursyKryptowalut.jsx`), hooks in camelCase starting with `use`, and SCSS modules as `<Feature>.module.scss` with hyphenated class names. Keep layout logic declarative, prefer `next/image` and `next/link`, and centralize configuration in `services/` or `context/` rather than inline constants.

## Testing Guidelines
The project currently relies on linting and manual QA. When adding features, pair `npm run lint` with targeted checks: verify routing in `pages/`, data formatting in `services/`, and responsiveness against breakpoints defined in SASS. New automated tests should follow the pattern `*.test.jsx` beside the unit under test and use React Testing Library for components or integration snippets.

## Commit & Pull Request Guidelines
Recent commits favor short, lowercase summaries such as `heading update js`. Keep messages under 60 characters, use the imperative mood, and mention the affected feature (`poradnik detail fix`). Pull requests should link related issues, describe data sources touched (e.g., APIs under `services/crypto.js`), and include screenshots or GIFs for UI updates plus reproduction steps for bug fixes. Confirm lint passes in the PR description.
