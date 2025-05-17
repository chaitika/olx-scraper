import {scrape} from "./scraper.js";
import { Product } from "./product.js";

const res = await scrape();

const products = res.map(item => new Product(item.title, item.price, item.datePosted));

console.log(products[0].toJson().hash);