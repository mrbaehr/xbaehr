import { test, expect } from '@playwright/test';

test.describe('xbaehr.com', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Max Baehr/);
    await expect(page.locator('h1')).toContainText('Max Baehr');
  });

  test('home page has navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav a')).toHaveCount(5); // Logo + 3 nav items + contact
  });

  test('home page has correct tagline', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Product | Platform | Vibes')).toBeVisible();
  });

  test('navigation to writing page works', async ({ page }) => {
    await page.goto('/');
    await page.click('a:has-text("Writing Samples")');
    await expect(page).toHaveURL(/\/writing/);
    await expect(page.locator('h1')).toContainText('Writing Samples');
  });

  test('navigation to resume page works', async ({ page }) => {
    await page.goto('/');
    await page.click('a:has-text("Resume")');
    await expect(page).toHaveURL(/\/resume/);
    await expect(page.locator('h1')).toContainText('Resume');
  });

  test('writing page loads', async ({ page }) => {
    await page.goto('/writing');
    await expect(page).toHaveTitle(/Writing Samples/);
    await expect(page.locator('h1')).toContainText('Writing Samples');
  });

  test('resume page loads', async ({ page }) => {
    await page.goto('/resume');
    await expect(page).toHaveTitle(/Resume/);
    await expect(page.locator('h1')).toContainText('Resume');
  });

  test('email link is present', async ({ page }) => {
    await page.goto('/');
    const emailLink = page.locator('a[href*="mailto"]');
    await expect(emailLink).toContainText('m@xbaehr.com');
  });

  test('LinkedIn link is present', async ({ page }) => {
    await page.goto('/');
    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    await expect(linkedinLink).toBeVisible();
  });

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/nonexistent-page', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('404');
  });

  test('responsive navigation on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Max Baehr');
  });

  test('links navigate correctly', async ({ page }) => {
    await page.goto('/writing');
    await page.click('a:has-text("Info")');
    await expect(page).toHaveURL('/');
  });
});
