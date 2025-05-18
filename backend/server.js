import express from 'express'
import cors from "cors";

import { getAllProducts } from './db.js'

const app = express()
const PORT = 3001

app.use(cors())

app.get('/products', async (_req, res) => {
  try {
    const products = await getAllProducts()
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/products`)
  })
}
