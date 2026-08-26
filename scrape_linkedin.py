#!/usr/bin/env python3
"""
Scrape resume/profile data from LinkedIn using Playwright.
Extracts experience, education, skills, and summary for import into new site.

NOTE: Requires LinkedIn credentials. Set LINKEDIN_EMAIL and LINKEDIN_PASSWORD env vars.
"""

import asyncio
import json
import os
from pathlib import Path
from playwright.async_api import async_playwright


async def linkedin_login(page, email, password):
    """Log into LinkedIn."""
    print("Logging into LinkedIn...")
    await page.goto("https://www.linkedin.com/login", wait_until="domcontentloaded")
    
    # Fill in credentials
    await page.fill("input#username", email)
    await page.fill("input#password", password)
    await page.click("button[type='submit']")
    
    # Wait for redirect to home/profile
    try:
        await page.wait_for_url("**", timeout=15000)
        print("✓ Logged in successfully")
        return True
    except Exception as e:
        print(f"✗ Login failed: {e}")
        return False


async def scrape_profile(page, profile_url):
    """Scrape a LinkedIn profile."""
    print(f"Scraping profile: {profile_url}")
    
    try:
        await page.goto(profile_url, wait_until="domcontentloaded")
        await page.wait_for_load_state("networkidle", timeout=15000)
        
        profile_data = {
            "url": profile_url,
            "name": None,
            "headline": None,
            "summary": None,
            "experience": [],
            "education": [],
            "skills": [],
        }
        
        # Extract name
        try:
            name_elem = await page.locator("h1").first.text_content()
            if name_elem:
                profile_data["name"] = name_elem.strip()
        except:
            pass
        
        # Extract headline (current role)
        try:
            headline_elem = await page.locator("div[class*='headline']").first.text_content()
            if headline_elem:
                profile_data["headline"] = headline_elem.strip()
        except:
            pass
        
        # Extract about/summary
        try:
            about_elem = await page.locator("section[id='about'] div[class*='show-more']").first.text_content()
            if not about_elem:
                about_elem = await page.locator("section[id='about'] p").first.text_content()
            if about_elem:
                profile_data["summary"] = about_elem.strip()
        except:
            pass
        
        # Extract experience
        try:
            exp_section = await page.locator("section[id='experience']").first.inner_html()
            if exp_section:
                # Parse experience entries
                exp_items = await page.locator("section[id='experience'] li").all()
                for item in exp_items[:10]:  # Limit to 10 entries
                    try:
                        title = await item.locator("div[class*='title']").first.text_content()
                        company = await item.locator("span[class*='company']").first.text_content()
                        duration = await item.locator("span[class*='date']").first.text_content()
                        desc = await item.locator("p").first.text_content()
                        
                        if title or company:
                            profile_data["experience"].append({
                                "title": title.strip() if title else "",
                                "company": company.strip() if company else "",
                                "duration": duration.strip() if duration else "",
                                "description": desc.strip() if desc else "",
                            })
                    except:
                        continue
        except:
            pass
        
        # Extract education
        try:
            edu_section = await page.locator("section[id='education']").first.inner_html()
            if edu_section:
                edu_items = await page.locator("section[id='education'] li").all()
                for item in edu_items[:10]:
                    try:
                        school = await item.locator("div[class*='school']").first.text_content()
                        degree = await item.locator("span[class*='degree']").first.text_content()
                        field = await item.locator("span[class*='field']").first.text_content()
                        
                        if school or degree:
                            profile_data["education"].append({
                                "school": school.strip() if school else "",
                                "degree": degree.strip() if degree else "",
                                "field": field.strip() if field else "",
                            })
                    except:
                        continue
        except:
            pass
        
        # Extract skills (if public)
        try:
            skills_section = await page.locator("section[id='skills']").first.inner_html()
            if skills_section:
                skill_items = await page.locator("section[id='skills'] li").all()
                for item in skill_items[:20]:  # Limit to 20 skills
                    try:
                        skill_text = await item.text_content()
                        if skill_text:
                            profile_data["skills"].append(skill_text.strip())
                    except:
                        continue
        except:
            pass
        
        print("✓ Profile scraped")
        return profile_data
        
    except Exception as e:
        print(f"✗ Error scraping profile: {e}")
        return {"url": profile_url, "error": str(e)}


async def main():
    """Main function."""
    # Get credentials from env
    email = os.getenv("LINKEDIN_EMAIL")
    password = os.getenv("LINKEDIN_PASSWORD")
    profile_url = "https://www.linkedin.com/in/mbaehr"  # Your profile
    
    if not email or not password:
        print("❌ ERROR: LinkedIn credentials not found!")
        print("Set LINKEDIN_EMAIL and LINKEDIN_PASSWORD environment variables.")
        print("\nExample:")
        print("  export LINKEDIN_EMAIL='your.email@example.com'")
        print("  export LINKEDIN_PASSWORD='your.password'")
        print("  python3 scrape_linkedin.py")
        return
    
    result = {
        "site": "linkedin.com",
        "timestamp": __import__("datetime").datetime.now().isoformat(),
        "profile": {},
    }
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Log in
        logged_in = await linkedin_login(page, email, password)
        
        if not logged_in:
            print("❌ Failed to log in to LinkedIn")
            await browser.close()
            return
        
        # Scrape profile
        profile_data = await scrape_profile(page, profile_url)
        result["profile"] = profile_data
        
        await browser.close()
    
    # Save results
    output_file = Path("scraped_linkedin.json")
    with open(output_file, "w") as f:
        json.dump(result, f, indent=2)
    
    print(f"✓ LinkedIn scraping complete! Results saved to {output_file}")
    print(f"  Name: {result['profile'].get('name', 'N/A')}")
    print(f"  Experience entries: {len(result['profile'].get('experience', []))}")
    print(f"  Education entries: {len(result['profile'].get('education', []))}")
    print(f"  Skills: {len(result['profile'].get('skills', []))}")


if __name__ == "__main__":
    asyncio.run(main())
