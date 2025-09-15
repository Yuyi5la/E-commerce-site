import React, { useEffect, useState } from "react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.data || []);  
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      setLoading(false);
    });
}, []);


  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id || product._id}  // depending on your DB
              className="border rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={product.image_urls?.[0]} // if you store multiple images
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">₦{product.price}</p>
              <button className="mt-3 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
