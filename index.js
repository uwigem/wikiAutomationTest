const pupp = require("puppeteer");
const fs = require("fs");

const auth = fs.readFileSync("auth.txt", "utf8").split("\r\n");

(async () => {
    try {
        // Open the browser and create a new page
        const browser = await pupp.launch();
        const page = await browser.newPage();

        // // Open the iGEM page, log when loaded
        // await page.goto("https://2019.igem.org/Team:Washington/wkwokTestPage3", { waitUntil: "domcontentloaded" });
        // console.log("Loaded https://2019.igem.org/Team:Washington/wkwokTestPage3");

        // // Wait for the "open login iframe" function to be available
        // await page.waitForFunction("typeof(open_login_iframe) !== 'undefined'");
        // // window.open_login_iframe();
        // await page.evaluate(() => window.open_login_iframe())

        // let html = await page.evaluate(() => document.body.innerHTML);
        // // console.log(html);
        // await page.waitForFunction("document.querySelector('#nlogin_iframe') !== null");

        // let frames = await page.frames();
        // let loginFrame = frames.find(f => f.url().indexOf("Login2") > 0);

        // console.log(loginFrame);

        /////////////////
        await page.goto("https://igem.org/Login2", { waitUntil: "domcontentloaded" });
        // let html = await page.evaluate(() => document.body.innerHTML);
        // console.log(html);
        ////////////////

        await page.type(`#name_and_pass input[name="username"]`, auth[0]);
        await page.type(`#name_and_pass input[name="password"]`, auth[1]);
        await page.click(`input.submit`);


        /** get page cookies */
        let cookies = await page.cookies();
        ///////////////

        await page.goto("https://2019.igem.org/wiki/index.php?title=Team:Washington/wkwokTestPage3&action=edit", { waitUntil: "domcontentloaded" });
        await page.type(`#wpTextbox1`, "testgghmgvghjfytjkhjk!");
        await page.click(`#wpSave`);

        console.log("COMPLETED")

        // let html2 = await page.evaluate(() => document.body.innerHTML);
        // console.log(html2);

    } catch (e) {
        console.log("==========================")
        console.log("ERROR")
        console.log("==========================")
        console.log(e);
    }
})();