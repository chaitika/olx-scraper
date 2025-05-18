import puppeteer from "puppeteer";

const url = "https://www.olx.pt/coracaodejesus/?search%5Bdist%5D=15";

export async function scrape() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  await page.waitForSelector('div[data-testid="listing-grid"]');

  const listings = await page.$$eval(
    'div[data-testid="listing-grid"] > div',
    (nodes) =>
      nodes
        .map((node) => {
          const titleEl = node.querySelector("a h4");
          const priceEl = node.querySelector('[data-testid="ad-price"]');
          const dateEl = node.querySelector('[data-testid="location-date"]');
          const linkEl = node.querySelector("a");

          const title = titleEl?.innerText.trim();
          const href = linkEl?.getAttribute("href");
          const fullLink = href ? `https://www.olx.pt${href}` : null;

          if (!title) return null;

          return {
            title,
            price: priceEl?.innerText.trim() || null,
            datePosted: dateEl?.innerText.trim() || null,
            link: fullLink,
          };
        })
        .filter((item) => item !== null),
  );

  await browser.close();
  return listings;
}
