import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import toast from "react-hot-toast"; 

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null); // track which product is being added
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to fetch products");
        setLoading(false);
      });
  }, []);
const handleAddToCart = async (productId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please log in to add items to cart.");
    navigate("/login"); 
    return;
  }

  setAdding(productId);

  const start = Date.now();

  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: 1,
      }),
    });

    if (!res.ok) throw new Error("Failed to add to cart");

    await res.json();
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Item added to cart!");
  } catch (err) {
    console.error("Error adding to cart:", err);
    toast.error("Could not add to cart.");
  } finally {
    // Ensure at least 1 second before removing "Adding..."
    const elapsed = Date.now() - start;
    const delay = Math.max(0, 1000 - elapsed);
    setTimeout(() => setAdding(null), delay);
  }
};


  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-xl shadow-md p-4 hover:shadow-lg transition"
        >
          <Link to={`/products/${product.id}`}>
            <img
              src={product.image_urls?.[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
          </Link>
          <p className="text-gray-600">
            ₦{Number(product.price).toLocaleString()}
          </p>
          <button
            onClick={() => handleAddToCart(product.id)}
            disabled={adding === product.id}
            className={`mt-3 px-4 py-2 rounded-lg text-white ${
              adding === product.id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {adding === product.id ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Shop;
