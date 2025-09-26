import React, { useState, useEffect } from "react";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    images: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        console.error("Failed to load products:", data.message);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, images: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Create product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "images" && form.images) {
        for (let i = 0; i < form.images.length; i++) {
          formData.append("files", form.images[i]); // ✅ match Multer field name
        }
      } else {
        formData.append(key, form[key]);
      }
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in as admin to create products");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ admin auth
        },
        body: formData,
      });

      if (res.ok) {
        setForm({
          name: "",
          price: "",
          stock: "",
          description: "",
          images: null,
        });
        fetchProducts();
      } else {
        const errMsg = await res.text();
        setError(`Create failed: ${errMsg}`);
      }
    } catch (err) {
      console.error("Error creating product:", err);
      setError("Something went wrong while creating product");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in as admin to delete products");
        return;
      }

      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`Delete failed: ${errMsg}`);
      }

      fetchProducts(); // refresh list
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      {/* Create Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-10"
      >
        <h3 className="text-lg font-semibold mb-4">Add New Product</h3>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="file"
          name="images"
          multiple
          onChange={handleChange}
          className="mb-3"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>

      {/* List Products */}
      <h3 className="text-lg font-semibold mb-4">All Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow bg-white">
            <img
              src={p.image_urls?.[0]}
              alt={p.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h4 className="font-bold">{p.name}</h4>
            <p>₦{p.price}</p>
            <p>Stock: {p.stock}</p>
            <button
              onClick={() => handleDelete(p.id)}
              className="mt-3 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
