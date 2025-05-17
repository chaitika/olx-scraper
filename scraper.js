const puppeteer = require('puppeteer');

const url = 'https://www.olx.pt/coracaodejesus/?search%5Bdist%5D=15';

async function scrape() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('div[data-testid="listing-grid"]');

  const listings = await page.$$eval('div[data-testid="listing-grid"] > div', nodes =>
    nodes.map(node => {
      const titleEl = node.querySelector('a h4');
      const priceEl = node.querySelector('[data-testid="ad-price"]');
      const dateEl = node.querySelector('[data-testid="location-date"]');

      return {
        title: titleEl?.innerText.trim() || null,
        price: priceEl?.innerText.trim() || null,
        datePosted: dateEl?.innerText.trim() || null,
      }
    })
  );

  console.log('Listings:\n');
  // print only those with title
  const filteredListings = listings.filter(item => item.title);
  filteredListings.forEach((item, idx) => {
    console.log(`${idx + 1}.`);
    console.log(`  Title      : ${item.title}`);
    console.log(`  Price      : ${item.price}`);
    console.log(`  Date Posted: ${item.datePosted}`);
    console.log('---');
  });
  await browser.close();
}

scrape();
