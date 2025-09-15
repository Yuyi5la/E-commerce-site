import React from "react";
import { Instagram, Twitter, Music } from "lucide-react";

const Footer = () => {
  return (
    <section className="w-full bg-black text-white py-10 mt-10 px-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-2 uppercase tracking-wide">
        Join the Chrome Club
      </h1>
      <h4 className="text-gray-400 mb-6 text-sm">
        Get updates for new drops and exclusives
      </h4>

      {/* Divider */}
      <div className="h-px w-full bg-gray-700 mb-8" />

      {/* Feature content */}
      <div className="mb-8 space-y-6">
        {/* Newsletter form */}
        <form className="flex items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-64 px-3 py-2 bg-black border border-gray-600 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-white text-black text-sm font-semibold uppercase tracking-wide hover:bg-gray-200"
          >
            Join
          </button>
        </form>

        {/* Links */}
         <div className="flex flex-col gap-3 text-gray-400 text-sm uppercase tracking-wide">
          <a href="/home" className="hover:text-white">home</a>
        <a href="/about" className="hover:text-white">About</a>
         <a href="/shop" className="hover:text-white">Shop</a>
         <a href="/contact" className="hover:text-white">Contact</a>
         <a href="/signup" className="hover:text-white">login/register</a>
        </div>


        {/* Socials */}
        <div className="flex gap-6 text-gray-400 text-sm">
          <a href="#" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">TikTok</a>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-700 mb-6" />

      {/* Copyright */}
      <p className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ChromeHalo. All rights reserved.
      </p>
    </section>
  );
};

export default Footer;
