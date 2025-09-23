import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth"; 

export default function NavbarWithSidePanel() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const items = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Shop", to: "/shop" },
    { label: "Contact", to: "/contact" },
    { label: "Login/Register", to: "/signup" },
  
  ];

  const filtered = items.filter((x) =>
    x.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      // check token before hitting backend
      if (!token || isTokenExpired(token)) {
         localStorage.removeItem("token");
         console.warn("No valid token, showing empty cart for guest");
         setCartItems([]);
         return; 
                 }


      try {
        const res = await fetch("http://localhost:3000/api/cart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();
        setCartItems(data.order_items || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [navigate]);

  // close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setCartOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const cartTotal = cartItems.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  return (
    <>
      {/* Navbar */}
      <header className="w-full bg-white border-b border-black px-4 py-5 flex items-center justify-between relative z-10">
        {/* Left: hamburger */}
        <div
          onClick={() => setMenuOpen(true)}
          className="cursor-pointer text-2xl"
          aria-label="Open menu"
          role="button"
        >
          ☰
        </div>

        {/* Middle: brand */}
        <div className="flex items-center gap-2 font-bold tracking-wider">
          <img src="/logo2.webp" alt="Logo" className="h-10 w-10" />
          ChromeHalo
        </div>

        {/* Right: cart */}
        <div
          className="relative h-10 w-10 flex items-center justify-center text-2xl cursor-pointer"
          onClick={() => setCartOpen(true)}
        >
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
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

      {/* Side panel - LEFT menu */}
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

      {/* Side panel - RIGHT cart */}
   {/* Side panel - RIGHT cart */}
<aside
  className={`fixed inset-y-0 right-0 z-20 transform bg-white border-l border-black p-6
  transition-transform duration-300 ease-in-out
  ${cartOpen ? "translate-x-0" : "translate-x-full"}
  w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/3 flex flex-col`}
>
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-semibold">Your Cart</h2>
    <button onClick={() => setCartOpen(false)} className="text-2xl p-1">
      ✕
    </button>
  </div>

  {/* Cart Items - scrollable */}
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
              src={item.products.image_urls[0]}
              alt={item.products.name}
              className="w-14 h-14 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{item.products.name}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} × ₦{item.price}
              </p>
            </div>
          </div>
          <p className="font-bold text-gray-700">
            ₦{item.price * item.quantity}
          </p>
        </div>
      ))
    )}
  </div>

 {/* Divider + Footer section */}
{cartItems.length > 0 && (
  <div className="mt-4">
    {/* Subtotal above divider */}
    <div className="flex justify-between text-gray-700 text-base mb-2">
      <span>Subtotal</span>
      <span>₦{cartTotal}</span>
    </div>

    {/* Divider */}
    <div className="border-t my-3"></div>

    {/* Checkout button */}
    <div className="flex justify-center">
      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
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
