const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 1650,
        deviceScaleFactor: 1,
    });
    console.log("Iniciando...");
    await page.goto('https://moonid.net/account/login/?next=/api/account/connect/193/');

    /// Login
    await page.click("form table tbody #id_username");
    await page.type('input#id_username', process.env.KF_USER);
    await page.click("form table tbody #id_password");
    await page.type('input#id_password', process.env.KF_PWD);
    await page.click("form table tbody [type='submit']");
    console.log("Logou...");
    await page.waitForNavigation();

    while (true) {    
        /// Nav Mission
        await page.goto("https://int4.knightfight.moonid.net/raubzug/");

        /// Going Mission
        await page.waitForSelector("td.center:nth-child(1) > input:nth-child(1)");
        await page.click("td.center:nth-child(1) > input:nth-child(1)");
        console.log("Mission...")

        await page.waitForTimeout((1000 * 60 * 10) + 500);
    }
})();

