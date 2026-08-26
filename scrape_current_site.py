#!/usr/bin/env python3
"""
Scrape content from xbaehr.com using Playwright.
Extracts page structure, content, and metadata for import into new site.
"""

import asyncio
import json
from pathlib import Path
from playwright.async_api import async_playwright


async def scrape_page(page, url, page_name):
    """Scrape a single page and extract content."""
    print(f"Scraping {page_name}: {url}")
    
    try:
        await page.goto(url, wait_until="networkidle")
        await page.wait_for_load_state("domcontentloaded")
        
        # Extract page metadata and content
        content = {
            "url": url,
            "page_name": page_name,
            "title": await page.title(),
            "headings": [],
            "paragraphs": [],
            "links": [],
            "images": [],
        }
        
        # Extract all headings
        headings = await page.locator("h1, h2, h3").all()
        for h in headings:
            text = await h.text_content()
            if text:
                content["headings"].append(text.strip())
        
        # Extract all paragraphs
        paragraphs = await page.locator("p").all()
        for p in paragraphs:
            text = await p.text_content()
            if text:
                content["paragraphs"].append(text.strip())
        
        # Extract all links
        links = await page.locator("a").all()
        for link in links:
            href = await link.get_attribute("href")
            text = await link.text_content()
            if href and text:
                content["links"].append({
                    "text": text.strip(),
                    "href": href,
                })
        
        # Extract images
        images = await page.locator("img").all()
        for img in images:
            src = await img.get_attribute("src")
            alt = await img.get_attribute("alt") or ""
            if src:
                content["images"].append({
                    "src": src,
                    "alt": alt,
                })
        
        # Extract main content as HTML for reference
        main_content = await page.locator("main, .main, article, .content").first.inner_html() if await page.locator("main, .main, article, .content").first.count() > 0 else None
        if main_content:
            content["main_html_snippet"] = main_content[:1000]  # First 1000 chars
        
        print(f"  ✓ Extracted from {page_name}")
        return content
        
    except Exception as e:
        print(f"  ✗ Error scraping {page_name}: {e}")
        return {"url": url, "page_name": page_name, "error": str(e)}


async def main():
    """Main scraping function."""
    base_url = "https://xbaehr.com"
    
    # Pages to scrape (will discover links on home page)
    pages_to_scrape = [
        (f"{base_url}", "Home"),
        (f"{base_url}/", "Home (trailing slash)"),
    ]
    
    all_content = {
        "site": "xbaehr.com",
        "timestamp": __import__("datetime").datetime.now().isoformat(),
        "pages": [],
    }
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(ignore_https_errors=True)
        
        # Set viewport for consistency
        await page.set_viewport_size({"width": 1280, "height": 720})
        
        # Scrape initial page to discover nav links
        print(f"Connecting to {base_url}...")
        try:
            await page.goto(base_url, wait_until="networkidle", timeout=30000)
        except Exception as e:
            print(f"Error connecting to {base_url}: {e}")
            print("Site may be down or DNS may not be resolving.")
            await browser.close()
            return
        
        # Extract navigation links
        nav_links = await page.locator("nav a, header a, [role='navigation'] a").all()
        discovered_pages = set()
        
        for link in nav_links:
            href = await link.get_attribute("href")
            if href and not href.startswith("http") and href != "/":
                full_url = f"{base_url}{href}" if not href.startswith("/") else f"{base_url}{href}"
                if not full_url.startswith("http"):
                    full_url = base_url + href
                discovered_pages.add((full_url, href.strip("/")))
        
        print(f"Discovered {len(discovered_pages)} pages from nav")
        
        # Add discovered pages to scrape list
        pages_to_scrape.extend(discovered_pages)
        
        # Deduplicate
        pages_to_scrape = list(dict.fromkeys(pages_to_scrape))
        
        # Scrape all pages
        for url, page_name in pages_to_scrape[:10]:  # Limit to 10 pages
            content = await scrape_page(page, url, page_name)
            all_content["pages"].append(content)
        
        await browser.close()
    
    # Save results
    output_file = Path("scraped_content.json")
    with open(output_file, "w") as f:
        json.dump(all_content, f, indent=2)
    
    print(f"\n✓ Scraping complete! Results saved to {output_file}")
    print(f"  Pages scraped: {len(all_content['pages'])}")


if __name__ == "__main__":
    asyncio.run(main())
