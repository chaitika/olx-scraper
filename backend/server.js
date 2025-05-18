import express from "express";
import cors from "cors";

import { getPaginatedProducts } from "./db.js";

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/products", async (req, res) => {
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "10");

  try {
    const products = await getPaginatedProducts({ page, limit });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/products`);
  });
}
