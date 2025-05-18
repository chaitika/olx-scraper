import crypto from "crypto";

export class Product {
    constructor(name, price, date){
        this.name = name; 
        this.price = price; 
        this.date = date; 
        this.hash = Product.generateHash(name , price);
        this.timestamp = new Date().toISOString()
    }

    static generateHash(name, price) {
    return crypto.createHash('sha256').update(`${name}${price}`).digest('hex')
  }

  toJson() {
    return {
        hash: this.hash,
        name: this.name, 
        price: this.price, 
        date: this.date,
        timestamp: this.timestamp
    }
  }
}