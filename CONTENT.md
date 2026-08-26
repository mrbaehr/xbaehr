# Content Management Guide

This document explains how to update content on your personal website.

## Site Structure

- **Home Page** (`pages/index.tsx`) — Personal intro, tagline, quick links
- **Writing Page** (`pages/writing.tsx`) — Published work, links to LinkedIn, Substack, case studies
- **Resume Page** (`pages/resume.tsx`) — CV, experience, education, skills, PDF download
- **404 Page** (`pages/404.tsx`) — Error page

## How to Update Content

### 1. Home Page (Personal Statement)

**File**: `pages/index.tsx` (lines 31-36)

```tsx
<section className={styles.intro}>
  <p>
    I'm a product and platform-focused technologist with a background in building scalable systems 
    and leading cross-functional teams. I'm passionate about clean design, thoughtful architecture, 
    and shipping products that matter.
  </p>
</section>
```

**To update:**
1. Edit the `<p>` tag content
2. Commit and push to GitHub
3. Site auto-updates via GitHub Actions in ~2 minutes

---

### 2. Writing Page (Published Work)

**File**: `pages/writing.tsx`

#### LinkedIn Articles Link
**Line 36-40**: Already linked to your LinkedIn profile. No changes needed.

#### Substack Newsletter Link
**Line 45**: Currently has a placeholder `href="#"`

**To add your Substack:**
1. Replace `href="#"` with your Substack URL (e.g., `href="https://yourname.substack.com"`)
2. Optionally update the description text
3. Commit and push

**Example:**
```tsx
<a href="https://substack.com/@yourname" target="_blank" rel="noopener">
  Substack Newsletter
</a>
```

#### Case Studies / Featured Work
**Line 53-56**: General description. Update this section to highlight specific projects or work samples.

---

### 3. Resume Page (Experience, Education, Skills)

**File**: `pages/resume.tsx`

The resume page has three placeholder sections:

#### Experience (Line 44-46)
```tsx
<h3>Experience</h3>
<p className={styles.placeholder}>
  [Your professional experience will go here...]
</p>
```

**To update:**
Replace the placeholder with actual experience. You can:
- Option A: Use structured HTML (recommended)
- Option B: Provide your LinkedIn credentials and we'll scrape your profile automatically
- Option C: Paste your resume content directly

**Example of structured format:**
```tsx
<h3>Experience</h3>

<div>
  <h4>Senior Product Manager | Acme Corp</h4>
  <p className={styles.date}>2022 - Present</p>
  <ul>
    <li>Led cross-functional team to ship product X</li>
    <li>Grew user base from 10k to 1M users</li>
  </ul>
</div>

<div>
  <h4>Product Manager | StartupXYZ</h4>
  <p className={styles.date}>2020 - 2022</p>
  <ul>
    <li>Defined product strategy for mobile apps</li>
  </ul>
</div>
```

#### Education (Line 48-51)
Similar to experience. Replace placeholder with:
- School name
- Degree / Major
- Graduation year

#### Skills (Line 53-56)
Replace placeholder with comma-separated or bulleted list of skills.

#### Resume PDF
**Line 60-63**: Link to `/resume.pdf`

To add a PDF:
1. Place your resume PDF in the `public/` folder as `resume.pdf`
2. Users can download it via the "Download PDF Resume" link

---

## Development Workflow

### To test changes locally:
```bash
npm install
npm run dev
```

Then visit `http://localhost:3000/`

### To deploy changes:
```bash
git add .
git commit -m "Update: [description of changes]"
git push origin [your-branch-name]
```

Then create a pull request. Once merged to `main`, GitHub Actions automatically:
1. Builds the site
2. Runs all E2E tests
3. Deploys to GitHub Pages

**Deployment typically completes in 2-3 minutes.**

---

## Content Best Practices

✅ **Do:**
- Keep descriptions concise and clear
- Use bullet points for readability
- Update resume annually or after major changes
- Test links before committing
- Include specific metrics or achievements

❌ **Don't:**
- Share sensitive information (passwords, private data)
- Leave placeholder text in production
- Break the page layout (watch line lengths, nesting)
- Commit without testing locally first

---

## Common Updates Checklist

### Monthly
- [ ] Review and update current role description if needed
- [ ] Check all external links (LinkedIn, Substack, portfolio)

### Quarterly
- [ ] Update key metrics or achievements
- [ ] Review and refresh writing samples
- [ ] Check for typos and grammatical issues

### After Job Changes
- [ ] Update current role and company
- [ ] Add new experience entry
- [ ] Update summary/tagline if needed
- [ ] Update skills list

### After Publishing
- [ ] Add new writing sample link on writing page
- [ ] Link to published articles/posts
- [ ] Update writing summary if needed

---

## Styling

All pages use CSS Modules for scoped styling:
- `styles/Home.module.css` — Home page specific styles
- `styles/Page.module.css` — Shared styles for all other pages
- `styles/globals.css` — Global reset and base styles

To update styling, edit the `.module.css` files. Changes auto-apply.

---

## Questions or Issues?

- Check `README.md` for project setup
- Check `DEVELOPMENT.md` for local development guide
- Review existing page code as examples
- Test locally before pushing to main

---

## File Structure Quick Reference

```
pages/
  ├── index.tsx          ← Home page
  ├── writing.tsx        ← Writing samples
  ├── resume.tsx         ← Resume/CV
  ├── 404.tsx            ← Error page
  ├── _app.tsx           ← App wrapper
  └── _document.tsx      ← HTML template
  
styles/
  ├── Home.module.css    ← Home page styles
  ├── Page.module.css    ← General page styles
  └── globals.css        ← Global styles

public/
  └── resume.pdf         ← Your resume PDF (add this file)
```
