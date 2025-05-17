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

startServer()