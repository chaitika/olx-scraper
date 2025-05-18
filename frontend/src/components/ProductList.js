function ProductList({ products }) {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.hash} style={{ marginBottom: "1rem" }}>
          <strong>{p.name}</strong>
          <br />
          Price: {p.price}
          <br />
          Date: {p.date_posted}
          <br />
          Link:{" "}
          <a href={p.link} target="_blank" rel="noopener noreferrer">
            {p.link}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
