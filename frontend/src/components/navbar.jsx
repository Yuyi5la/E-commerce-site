// src/components/NavbarWithSidePanel.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";
import toast from "react-hot-toast";

export default function NavbarWithSidePanel() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  const items = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Shop", to: "/shop" },
    { label: "Contact", to: "/contact" },
    { label: "Login/Register", to: "/login" },
  ];

  const filtered = items.filter((x) =>
    x.label.toLowerCase().includes(query.toLowerCase())
  );

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      if (token && isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      setCartItems([]);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setCartItems([]);
        return;
      }

      if (!res.ok) throw new Error(`Failed to fetch cart (${res.status})`);

      const data = await res.json();
      const items =
        data?.order_items || data?.data?.order_items || data?.items || [];
      setCartItems(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("cart") === "open") setCartOpen(true);
  }, [location]);

  useEffect(() => {
    fetchCart();

    const handleLogin = () => fetchCart();
    const handleLogout = () => setCartItems([]);
    const handleCartUpdate = () => fetchCart();

    window.addEventListener("login", handleLogin);
    window.addEventListener("logout", handleLogout);
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("login", handleLogin);
      window.removeEventListener("logout", handleLogout);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

// Replace handleRemoveFromCart function in NavbarWithSidePanel.jsx

const handleRemoveFromCart = async (itemId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please log in to remove items from cart.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/cart/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to remove item from cart");

    fetchCart(); // refresh cart
    toast.success("Item removed from cart!");
    window.dispatchEvent(new Event("cartUpdated")); 
  } catch (err) {
    console.error("Error removing item:", err);
    toast.error("Could not remove item from cart");
  }
};


  const distinctCount = cartItems.length;
  const totalQuantity = cartItems.reduce(
    (acc, i) => acc + (Number(i.quantity) || 0),
    0
  );
  const cartTotal = cartItems.reduce(
    (acc, i) => acc + (Number(i.price) || 0) * (Number(i.quantity) || 0),
    0
  );
  const formatNaira = (val) => `₦${Number(val).toLocaleString()}`;

  return (
    <>
      {/* Navbar */}
      <header className="w-full bg-white border-b border-black px-4 py-5 flex items-center justify-between relative z-10">
        <div
          onClick={() => setMenuOpen(true)}
          className="cursor-pointer text-2xl"
          aria-label="Open menu"
          role="button"
        >
          ☰
        </div>

        <div className="flex items-center gap-2 font-bold tracking-wider">
          <img src="/logo2.webp" alt="Logo" className="h-10 w-10" />
          ChromeHalo
        </div>

        <div
          className="relative h-10 w-10 flex items-center justify-center text-2xl cursor-pointer"
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
          role="button"
        >
          🛒
          {distinctCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {distinctCount}
            </span>
          )}
        </div>
      </header>

      {/* Overlay */}
      {(menuOpen || cartOpen) && (
        <div
          className="fixed inset-0 bg-black/60 z-10"
          onClick={() => {
            setMenuOpen(false);
            setCartOpen(false);
          }}
        />
      )}

      {/* Left Menu */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 transform bg-white border-r border-black p-6
        transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/3`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-2xl p-1">
            ✕
          </button>
        </div>

        <div className="mb-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <nav>
          <ul className="space-y-3">
            {filtered.length === 0 ? (
              <li className="text-sm text-gray-500">No results</li>
            ) : (
              filtered.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="block px-2 py-2 rounded hover:bg-black/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </nav>
      </aside>

      {/* Right Cart */}
      <aside
        className={`fixed inset-y-0 right-0 z-20 transform bg-white border-l border-black p-6
        transition-transform duration-300 ease-in-out
        ${cartOpen ? "translate-x-0" : "translate-x-full"}
        w-80 sm:w-96 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={() => setCartOpen(false)} className="text-2xl p-1">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Cart is empty 💤</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.products?.image_urls?.[0] || "/placeholder.png"}
                    alt={item.products?.name || "Product"}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">
                      {item.products?.name || "Product"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × {formatNaira(item.price)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <p className="font-bold text-gray-700">
                    {formatNaira(
                      (Number(item.price) || 0) *
                        (Number(item.quantity) || 0)
                    )}
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-gray-700 text-base mb-2">
              <span className="text-sm text-gray-600">
                Subtotal ({distinctCount} items, {totalQuantity} qty)
              </span>
              <span className="font-medium">{formatNaira(cartTotal)}</span>
            </div>

            <div className="border-t my-3" />

            <div className="flex justify-center">
              <button
                onClick={() => {
                  setCartOpen(false);
                  navigate("/checkout");
                }}
                className="w-40 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
