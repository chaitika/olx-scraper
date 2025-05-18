import knex from "knex";
import config from "./knexfile.js";

const db = knex(config.development);

export async function saveAllProducts(products) {
  if (!products || products.length === 0) return;

  const rows = products.map((p) => {
    const { name, price, date, hash, link, timestamp } = p.toJson();
    return { name, price, date_posted: date, link, hash, timestamp };
  });

  await db("products").insert(rows).onConflict("hash").ignore();
}

export async function getPaginatedProducts({ page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;
  return await db("products")
    .orderBy("timestamp", "desc")
    .limit(limit)
    .offset(offset);
}