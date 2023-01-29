const puppeteer = require("puppeteer");

describe("Check that card height is 100%", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });

  it("Shows that card height is 100%", async () => {
    await page.goto("http://localhost:3001", {
      waitUntil: "load",
      timeout: 60000,
    });

    const isHeightFull = async (page) => {
      try {
        const card = await page.$eval(".card", (el) => {
          return el.getAttribute("class").includes("h-100");
        });
        return card;
      } catch (e) {
        return false;
      }
    };

    const cardHeight = await isHeightFull(page);

    await expect(cardHeight).toBe(true);
  }, 60000);
});
