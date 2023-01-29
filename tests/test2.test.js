const puppeteer = require("puppeteer");

describe("Check for horizontal padding", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });

  it("Checks if correct horizontal padding is added", async () => {
    await page.goto("http://localhost:3001", {
      waitUntil: "load",
      timeout: 60000,
    });

    const isPaddingPresent = async (page) => {
      try {
        const feed = await page.$eval(".feed-toggle", (el) => {
          return el.getAttribute("class").includes("px-4");
        });
        return feed;
      } catch (e) {
        return false;
      }
    };

    const padding = await isPaddingPresent(page);

    await expect(padding).toBe(true);
  }, 60000);
});
