import React from "react";
import Marquee from "react-fast-marquee";

const Home = () => {
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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40">
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to ChromeHalo</h1>
          <p className="mt-4 text-lg md:text-xl">Trap the stars in your smile</p>
          <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-black hover:text-white">
            Shop Now
          </button>
        </div>
      </div>

      {/* Grillz Section */}
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col-reverse md:flex-row gap-12 items-center">
          {/* Text Section */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-6">
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
    <img src="/Grillz 2.jpg" alt="Grillz" className="h-40 w-auto mx-4 rounded-lg shadow-md block" />
    <img src="/Grillz 6.jpg" alt="Grillz" className="h-40 w-auto mx-4 rounded-lg shadow-md block" />
    <img src="/grillz 4.jpg" alt="Grillz" className="h-40 w-auto mx-4 rounded-lg shadow-md block" />
    <img src="/Grillz 5.webp" alt="Grillz" className="h-40 w-auto mx-4 rounded-lg shadow-md block" />
    <img src="/Grillz 2.jpg" alt="Grillz" className="h-40 w-auto mx-4 rounded-lg shadow-md block" />
    <img src="/Grillz 6.jpg" alt="Grillz" className="h-40 w-auto mx-4 rounded-lg shadow-md block" />
    <img src="/grillz 4.jpg" alt="Grillz" className="h-40 w-auto mx-4 rounded-lg shadow-md block" />
    <img src="/Grillz 5.webp" alt="Grillz" className="h-40 w-auto mx-4 rounded-lg shadow-md block" />
  </div>
</Marquee>

      

     
    </div>
  );
};

export default Home;
