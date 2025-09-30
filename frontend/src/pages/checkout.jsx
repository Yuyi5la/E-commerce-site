import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // helper to format money as Naira
  const formatNaira = (val) => `₦${Number(val).toLocaleString()}`;

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // no cart if not logged in

      try {
        const res = await fetch(`${API_URL}/cart`, {
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

  // calculate subtotal dynamically
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* LEFT: Shipping & Payment */}
      <div>
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {/* Shipping Info */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>
          </form>
        </div>

        {/* Payment Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
              <input
                type="text"
                placeholder="CVC"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="bg-gray-50 border rounded-lg p-6 h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {/* List of cart items */}
        <div className="space-y-3 mb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.products?.name} × {item.quantity}
              </span>
              <span className="font-medium">
                {formatNaira(item.price * item.quantity)}
              </span>
            </div>
          ))}

          {/* Subtotal */}
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatNaira(cartTotal)}</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">{formatNaira(2000)}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-4"></div>

        {/* Total */}
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>{formatNaira(cartTotal + 2000)}</span>
        </div>

        {/* Place order */}
        <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 cursor-pointer">
          Place Order
        </button>
      </div>
    </div>
  );
}
