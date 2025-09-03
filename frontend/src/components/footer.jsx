import React from "react";

const Footer = () => {
  return (
    <section className="w-full bg-black text-white py-10 mt-10 px-6">
      
      <h1 className="text-2xl sm:text-1xl font-bold mb-4">
        Join the Chrome Club
      </h1>
      <h4>get updates for new drops</h4>

       {/* Divider 1 (under h4) */}
      <div className="h-px w-full bg-gray-500 mb-8" />

      {/* Space for future content */}
      <div className="mb-8">
        {/* Example placeholder: newsletter form, social links, etc. */}
        <p className="text-gray-400">[Feature content goes here]</p>
      </div>

      {/* Divider line */}
      <div className="h-px w-full bg-gray-500 mb-6" />

      {/* Copyright */}
      <p className="text-center">© {new Date().getFullYear()} ChromeHalo. All rights reserved.</p>
    </section>
  );
};

export default Footer;
