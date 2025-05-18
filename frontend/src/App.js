import React, { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2>OLX Listings</h2>
      {loading ? <p>Loading...</p> : (
        <ul>
          {products.map((p) => (
            <li key={p.hash} style={{ marginBottom: '1rem' }}>
              <strong>{p.name}</strong><br />
              Price: {p.price}<br />
              Date: {p.date_posted}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
