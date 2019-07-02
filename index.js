const pupp = require("puppeteer");

(async () => {
    try {
        // Open the browser and create a new page
        const browser = await pupp.launch();
        const page = await browser.newPage();

        // Open the iGEM page, log when loaded
        await page.goto("https://2019.igem.org/Team:Washington/wkwokTestPage3", { waitUntil: "domcontentloaded" });
        console.log("Loaded https://2019.igem.org/Team:Washington/wkwokTestPage3");

        // Wait for the "open login iframe" function to be available
        await page.waitForFunction("typeof(open_login_iframe) !== 'undefined'");
        // window.open_login_iframe();
        await page.evaluate(() => window.open_login_iframe())

        let html = await page.evaluate(() => document.body.innerHTML);
        // console.log(html);
        await page.waitForFunction("document.querySelector('#nlogin_iframe') !== null");

        let frames = await page.frames();
        let loginFrame = frames.find(f => f.url().indexOf("Login2") > 0);

        await loginFrame.type(`#name_and_pass input[name="username"]`, "USER");
        await loginFrame.type(`#name_and_pass input[name="password"]`, "PASS");
        await loginFrame.click(`#name_and_pass input.submit`);

        await page.waitForNavigation({ waitUntil: "domcontentloaded" });
        console.log(page.cookies());
    } catch (e) {
        console.log("==========================")
        console.log("ERROR")
        console.log("==========================")
        console.log(e);
    }
})();