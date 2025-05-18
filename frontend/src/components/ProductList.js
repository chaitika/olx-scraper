import styles from "./ProductList.module.css";

function ProductList({ products }) {
  return (
    <ul className={styles.list}>
      {products.map((p) => (
        <li key={p.hash} className={styles.item}>
          <div className={styles.title}>{p.name}</div>
          <div className={styles.meta}>Price: {p.price}</div>
          <div className={styles.meta}>Date: {p.date_posted}</div>
          <div>
            Link:{" "}
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {p.link}
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
