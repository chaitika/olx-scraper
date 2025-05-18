import { scrape } from './scraper.js'
import { Product } from './product.js'
import { saveAllProducts } from './db.js'
import { startServer } from './server.js'

export async function scrapeAndSave() {
  const rawListings = await scrape()
  const products = rawListings.map(item => new Product(item.title, item.price, item.datePosted))
  await saveAllProducts(products)
}

await scrapeAndSave()

const SCRAPE_INTERVAL =  5 * 60 * 1000 // 5 mins
setInterval(async () => {
  console.log(`[${new Date().toISOString()}] Running scheduled scrape`)
  await scrapeAndSave()
}, SCRAPE_INTERVAL)

startServer()