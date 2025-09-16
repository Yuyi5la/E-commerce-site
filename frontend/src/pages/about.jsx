import React from "react";

const About = () => {
  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/about 6.jpg"
          alt="About background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 lg:px-12">
        <div className="max-w-4xl text-center md:text-left space-y-6">
     <h1 className="text-5xl md:text-6xl font-extrabold uppercase text-white tracking-wide drop-shadow-lg font-orbitron">
       About Us
      </h1>


          <p className="text-lg leading-relaxed text-gray-100 drop-shadow-md">
  <span className="text-white font-semibold">ChromeHalo</span> wasn’t
            born from a business plan. It started as a passion for design,
            culture, and the shine of metal. From the beginning, our vision has
            been to merge craftsmanship with attitude creating grillz that
            don’t just accessorize, but define a look.
          </p>

          <p className="text-lg leading-relaxed text-gray-200">
           Each piece reflects the energy of Lagos, inspired by the{" "}
          <span className="text-white font-semibold">Y2K aesthetic,</span>{" "}
         futuristic, bold, and unapologetically chrome. Through challenges
         and breakthroughs, we’ve stayed committed to the details that
         matter: precision fit, premium metals, and designs that last.
          </p>


          <p className="text-lg leading-relaxed text-gray-200">
            At ChromeHalo, it’s not just about jewelry. It’s{" "}
            <span className="text-white font-semibold">
              about culture, about expression
            </span>
            , about bringing shine into everyday life.
          </p>


        </div>
      </div>
      
    </section>
    
  );
};

export default About;
