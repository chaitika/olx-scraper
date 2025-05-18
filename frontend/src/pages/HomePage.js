import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { fetchProducts } from "../api/products";
import styles from "./HomePage.module.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const loadProducts = async (page) => {
    setLoading(true);
    try {
      const newProducts = await fetchProducts(page, limit);
      setProducts((prev) => [...prev, ...newProducts]);
      if (newProducts.length < limit) setHasMore(false);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>OLX Listings</h2>
      <ProductList products={products} />
      {loading && <p>Loading...</p>}
      {!loading && hasMore && (
        <button
          className={styles.button}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Load More
        </button>
      )}
      {!hasMore && <p>No more listings available.</p>}
    </div>
  );
}

export default HomePage;
