import { test, expect } from '@playwright/test';

test.describe('xbaehr.com', () => {
  test.describe('Home Page', () => {
    test('loads with correct title', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Max Baehr/);
    });

    test('displays main heading', async ({ page }) => {
      await page.goto('/');
      const heading = page.locator('h1');
      await expect(heading).toContainText('Max Baehr');
    });

    test('displays tagline', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('text=Product | Platform | Vibes')).toBeVisible();
    });

    test('renders navigation menu', async ({ page }) => {
      await page.goto('/');
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      
      // Check for nav links
      await expect(page.locator('nav a:has-text("Info")')).toBeVisible();
      await expect(page.locator('nav a:has-text("Writing Samples")')).toBeVisible();
      await expect(page.locator('nav a:has-text("Resume")')).toBeVisible();
    });

    test('displays email contact link', async ({ page }) => {
      await page.goto('/');
      const emailLink = page.locator('a[href*="mailto:m@xbaehr.com"]');
      await expect(emailLink).toBeVisible();
      await expect(emailLink).toContainText('m@xbaehr.com');
    });

    test('displays LinkedIn link', async ({ page }) => {
      await page.goto('/');
      const linkedinLink = page.locator('a[href*="linkedin.com/in/mbaehr"]');
      await expect(linkedinLink).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('navigates to Writing page', async ({ page }) => {
      await page.goto('/');
      await page.click('a:has-text("Writing Samples")');
      await expect(page).toHaveURL(/\/writing/);
      await expect(page.locator('h1')).toContainText('Writing Samples');
    });

    test('navigates to Resume page', async ({ page }) => {
      await page.goto('/');
      await page.click('a:has-text("Resume")');
      await expect(page).toHaveURL(/\/resume/);
      await expect(page.locator('h1')).toContainText('Resume');
    });

    test('returns to Home from any page', async ({ page }) => {
      await page.goto('/writing');
      await page.click('a:has-text("Info")');
      await expect(page).toHaveURL('/');
    });

    test('logo link returns to home', async ({ page }) => {
      await page.goto('/resume');
      await page.click('nav a >> first');
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Writing Page', () => {
    test('loads with correct title', async ({ page }) => {
      await page.goto('/writing');
      await expect(page).toHaveTitle(/Writing Samples/);
    });

    test('displays heading', async ({ page }) => {
      await page.goto('/writing');
      await expect(page.locator('h1')).toContainText('Writing Samples');
    });

    test('displays subtitle', async ({ page }) => {
      await page.goto('/writing');
      await expect(page.locator('text=Articles, case studies, and technical insights')).toBeVisible();
    });

    test('displays published work section', async ({ page }) => {
      await page.goto('/writing');
      await expect(page.locator('h2')).toContainText('Published Work');
    });

    test('displays contact section', async ({ page }) => {
      await page.goto('/writing');
      await expect(page.locator('text=Get in Touch')).toBeVisible();
    });
  });

  test.describe('Resume Page', () => {
    test('loads with correct title', async ({ page }) => {
      await page.goto('/resume');
      await expect(page).toHaveTitle(/Resume/);
    });

    test('displays heading', async ({ page }) => {
      await page.goto('/resume');
      await expect(page.locator('h1')).toContainText('Resume');
    });

    test('displays professional summary', async ({ page }) => {
      await page.goto('/resume');
      await expect(page.locator('text=Executive Summary')).toBeVisible();
    });

    test('displays experience section', async ({ page }) => {
      await page.goto('/resume');
      await expect(page.locator('text=Experience')).toBeVisible();
    });

    test('displays education section', async ({ page }) => {
      await page.goto('/resume');
      await expect(page.locator('text=Education')).toBeVisible();
    });

    test('displays skills section', async ({ page }) => {
      await page.goto('/resume');
      await expect(page.locator('text=Skills')).toBeVisible();
    });

    test('has PDF download link', async ({ page }) => {
      await page.goto('/resume');
      const pdfLink = page.locator('a[href*="resume.pdf"]');
      await expect(pdfLink).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('404 page shows for unknown routes', async ({ page }) => {
      await page.goto('/nonexistent-page-12345', { waitUntil: 'networkidle' });
      await expect(page.locator('h1')).toContainText('404');
      await expect(page.locator('text=Page Not Found')).toBeVisible();
    });

    test('404 page has back link to home', async ({ page }) => {
      await page.goto('/nonexistent-page-12345', { waitUntil: 'networkidle' });
      const backLink = page.locator('a:has-text("Back to home")');
      await expect(backLink).toBeVisible();
      await backLink.click();
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Responsive Design', () => {
    test('home page is mobile responsive', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
    });

    test('writing page is tablet responsive', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/writing');
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
    });

    test('resume page is desktop optimized', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/resume');
      await expect(page.locator('h1')).toBeVisible();
      const content = page.locator('text=Experience');
      await expect(content).toBeVisible();
    });
  });

  test.describe('Content Accessibility', () => {
    test('all pages have proper heading hierarchy', async ({ page }) => {
      await page.goto('/');
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThan(0);
    });

    test('links are keyboard accessible', async ({ page }) => {
      await page.goto('/');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(focused).toBe('A');
    });

    test('external links open in new tab', async ({ page, context }) => {
      await page.goto('/');
      const linkedinLink = page.locator('a[href*="linkedin.com"]');
      const target = await linkedinLink.getAttribute('target');
      expect(target).toBe('_blank');
    });
  });

  test.describe('Performance', () => {
    test('home page loads within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(5000); // 5 seconds
    });

    test('no console errors on home page', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      await page.goto('/');
      expect(errors).toHaveLength(0);
    });
  });
});

