const puppeteer = require("puppeteer");

describe("Check that margin is present", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });

  it("Shows that margin is present", async () => {
    await page.goto("http://localhost:3001", {
      waitUntil: "load",
      timeout: 60000,
    });

    const isMarginPresent = async (page) => {
      try {
        const checkMargin = await page.$eval(".row", (el) => {
          return el.getAttribute("class").includes("mt-2");
        });
        return checkMargin;
      } catch (e) {
        return false;
      }
    };

    const margin = await isMarginPresent(page);

    await expect(margin).toBe(true);

  }, 60000);
});