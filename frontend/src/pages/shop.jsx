import React, { useEffect, useState } from "react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    fetch(`${API_URL}/products`)
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

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to add items to cart.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1, // default to 1 for now
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      const data = await res.json();
      console.log("Cart updated:", data);
      alert("Item added to cart ");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Could not add to cart ");
    }
  };

  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-xl shadow-md p-4 hover:shadow-lg transition"
        >
          <img
            src={product.image_urls?.[0]}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">
             ₦{Number(product.price).toLocaleString()}
            </p>
          <button
            onClick={() => handleAddToCart(product.id)}
            className="mt-3 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Shop;
