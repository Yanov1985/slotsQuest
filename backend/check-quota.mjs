import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
    console.log("🕵️ Launching Chrome with authenticated NotebookLM profile...");
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            userDataDir: 'd:\\www\\Projects\\2025\\SlotQuest\\chrome_profile_notebooklm',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
        });
        
        const page = (await browser.pages())[0];
        console.log("🌐 Navigating to AI Studio Usage Dashboard...");
        await page.goto("https://aistudio.google.com/app/usage?project=gen-lang-client-0764220684&timeRange=last-28-days", { waitUntil: 'networkidle2', timeout: 60000 });
        
        console.log("⏳ Waiting 8 seconds for React/Angular to render the dynamic quota tables...");
        await new Promise(r => setTimeout(r, 8000));
        
        const pageText = await page.evaluate(() => {
            // Remove scripts and styles
            document.querySelectorAll('script, style, svg').forEach(el => el.remove());
            return document.body.innerText;
        });

        fs.writeFileSync("aistudio_quota_dump.txt", pageText);
        console.log(`✅ Extraction complete! Dumped ${pageText.length} characters of raw dashboard text to aistudio_quota_dump.txt`);
        
        await browser.close();
    } catch(e) {
        console.error("❌ CRITICAL ERROR:", e);
    }
})();
