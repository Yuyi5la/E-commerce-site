import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data.data || data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to cart.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: product.id, quantity }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      const data = await res.json();
      console.log("Cart updated:", data);
      window.dispatchEvent(new Event("cartUpdated"));
      alert("Item added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Could not add to cart.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="p-6 min-h-[60vh] flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Image gallery */}
      <div>
        <img
          src={product.image_urls?.[selectedImage]}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />
        <div className="flex mt-4 space-x-2">
          {product.image_urls?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name}-${index}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                selectedImage === index ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-col justify-start">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2,
          }).format(Number(product.price))}
        </p>
        <p className="mt-4 text-gray-700">{product.description || "No description available."}</p>

        {/* Quantity selector */}
        <div className="flex items-center mt-6 space-x-4">
          <span className="font-semibold">Quantity:</span>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300"
            >
              -
            </button>
            <span className="px-6 py-2">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className={`mt-2 px-2 py-2 text-sm rounded-lg text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
