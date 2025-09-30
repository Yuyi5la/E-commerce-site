import React from "react";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";



const Home = () => {
  
const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;


    useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[500px]">
        <img
          src="/homeimg2.jpeg"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />

        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">Welcome to ChromeHalo</h1>
          <p className="mt-4 text-lg md:text-xl">Trap the stars in your smile</p>
          <button  onClick={() => navigate("/shop")} className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-black hover:text-white cursor-pointer">
            Shop Now
          </button>
        </div>
      </div>

      {/* Grillz Section */}
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col-reverse md:flex-row gap-12 items-center">
          {/* Text Section */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-6 ">
              CUSTOMIZE YOUR GRILLZ!
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Let’s trap the stars in your smile. You dream it, we chrome it!  
               Our professional builders in the heart of Lagos, Nigeria craft each grill with
              precision and passion to deliver nothing but the best. 
              <br />
              <br />
              We deliver nothing but the best,making
             sure your creativity shines and your confidence glows
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition">
              Design Your Grillz
            </button>
          </div>

          {/* Image Section */}
          <div className="flex justify-center flex-1">
            <img
              src="/Grillz 2.jpg" // image path
              alt="Custom Grillz"
              className="rounded-lg shadow-lg max-h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

<Marquee speed={30} gradient={false} pauseOnHover className="items-center">
  <div className="flex items-center">
    {products.map((product) => (
      <Link
        key={product.id}
        to={`/products/${product.id}`}
        className="flex flex-col items-center mx-4 cursor-pointer"
      >
        <img
          src={product.image_urls[0]}
          alt={product.name}
          className="h-40 w-auto rounded-lg shadow-md"
        />
        <p className="mt-2 font-semibold text-sm">{product.name}</p>
        <p className="text-gray-600 text-sm">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2,
          }).format(Number(product.price))}
        </p>
      </Link>
    ))}
  </div>
</Marquee>


     
    </div>
  );
};

export default Home;
