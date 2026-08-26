# xbaehr.com — Personal Website

Modern, responsive personal website built with Next.js and deployed to GitHub Pages.

## Quick Start (Local Development)

```bash
# Clone the repo (if working locally)
git clone https://github.com/mrbaehr/xbaehr.git
cd xbaehr

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Building & Testing

```bash
# Build for production
npm run build

# Run E2E tests
npm test

# Export static site
npm run export
```

## Project Structure

- `pages/` — Next.js pages (routes): Home, Writing, Resume, 404
- `styles/` — CSS modules for component-scoped styling
- `e2e/` — Playwright E2E tests
- `public/` — Static assets (images, files, etc.)
- `.github/workflows/` — GitHub Actions for deployment

## Pages

- **Home** (`/`) — Personal intro and quick links
- **Writing** (`/writing`) — Published work and writing samples
- **Resume** (`/resume`) — CV and professional experience
- **About** (`/about`) — More detailed background

## Deployment

Automatically deployed to GitHub Pages on every push to `main` via GitHub Actions.

Site: [xbaehr.com](https://xbaehr.com)

## Technologies

- **Next.js 15** — React framework with static export
- **TypeScript** — Type-safe code
- **CSS Modules** — Scoped, maintainable styling
- **Playwright** — E2E testing
- **GitHub Pages** — Free hosting
- **GitHub Actions** — CI/CD pipeline