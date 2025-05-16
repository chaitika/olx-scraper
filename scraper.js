const puppeteer = require('puppeteer');

const url = 'https://www.olx.pt/coracaodejesus/?search%5Bdist%5D=15';

async function scrape() {
  const browser = await puppeteer.launch({ headless: 'new' }); 
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('.css-1g61gc2');

  // Extract titles
  const titles = await page.$$eval('.css-1g61gc2', elements =>
    elements.map(el => el.textContent.trim())
  );

  console.log('Listing Titles on Page 1:');
  titles.forEach((title, idx) => {
    console.log(`${idx + 1}. ${title}`);
  });

  await browser.close();
}

scrape();


