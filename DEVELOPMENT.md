# Personal Website - Build & Deployment

This is a Next.js-based personal website for Max Baehr, deployed to GitHub Pages.

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Build the site
npm run build

# Export static files
npm run export

# Test the build locally
npm start
```

### Run E2E Tests

```bash
# Install Playwright (one-time)
npm install

# Run tests
npm test
```

## Project Structure

```
├── pages/              # Next.js pages (routes)
│   ├── index.tsx       # Home page
│   ├── writing.tsx     # Writing samples page
│   ├── resume.tsx      # Resume/CV page
│   ├── 404.tsx         # 404 error page
│   └── _app.tsx        # App wrapper
├── styles/             # CSS modules
│   ├── Home.module.css # Home page styles
│   ├── Page.module.css # Shared page styles
│   └── globals.css     # Global styles
├── e2e/                # Playwright tests
│   └── site.spec.ts    # Integration tests
├── public/             # Static assets
├── package.json        # Dependencies and scripts
├── next.config.js      # Next.js configuration
└── playwright.config.ts # Playwright configuration
```

## Content

- **Home Page** - Personal introduction and quick links
- **Writing Samples** - Links to published work and external content
- **Resume/CV** - Professional experience and background
- **Navigation** - Persistent navigation across all pages

## Deployment

The site is configured to deploy to GitHub Pages using GitHub Actions:

1. Push code to `main` branch
2. GitHub Actions builds the site
3. Static files are deployed to `gh-pages` branch
4. Site is live at `https://xbaehr.com`

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **CSS Modules** - Component-scoped styling
- **Playwright** - E2E testing
- **GitHub Pages** - Hosting

## Notes

- Site is static and fully self-contained
- No external dependencies or APIs required
- Fast load times and excellent performance
- Mobile-responsive design
