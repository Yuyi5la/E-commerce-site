import React from "react";

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
  {/* === Products (mobile-friendly chrome panel) === */}
<section className="w-full bg-white py-8">
  <div className="mx-auto max-w-6xl px-4">
    <div className="h-px w-full bg-gray-300" />

    <h2 className="mt-4 text-center text-2xl sm:text-3xl font-bold tracking-wide">
      Our Grillz
    </h2>
    <p className="mt-1 text-center text-sm text-gray-500">
      Premium shine • Stainless attitude
    </p>

    <div className="mt-6 rounded-2xl bg-neutral-900 text-white p-3 sm:p-6 lg:p-8">
      <div className="h-px w-full bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 opacity-60" />

      <div
        className="mt-4 overflow-x-auto px-1 -mx-1 sm:mx-0 touch-pan-x"
        aria-hidden={false}
      >
        <div className="flex gap-4 sm:gap-6 items-stretch snap-x snap-mandatory md:snap-proximity">
          {[
            { src: "/homeimg.jpg", title: "Iced Gap Grill", price: "$180" },
            { src: "/Grillz 2.jpg", title: "Mirror Chrome", price: "$220" },
            { src: "/Grillz 5.webp", title: "Custom Letters", price: "$260" },
            { src: "/Grillz 6.jpg", title: "Gold Drip", price: "$240" },
          ].map((p) => (
            <article
              key={p.title}
              className="
                group relative snap-start
                min-w-[80%] sm:min-w-[200px] md:min-w-[240px]
                rounded-2xl overflow-hidden
                "
            >
              {/* thin chrome frame (less intense on small screens) */}
              <div className="absolute inset-0 rounded-2xl p-[1px]
                              bg-[linear-gradient(135deg,#9ca3af_0%,#f5f5f5_25%,#9ca3af_50%,#f5f5f5_75%,#9ca3af_100%)]
                              opacity-60 sm:opacity-80 transition-opacity" />

              {/* inner card */}
              <div className="relative z-10 h-full w-full rounded-2xl bg-neutral-900/85 backdrop-blur-sm">
                {/* subtle shine (reduced on mobile) */}
                <div className="pointer-events-none absolute -left-1/3 -top-1/4 h-[140%] w-1/2 rotate-[25deg]
                                bg-gradient-to-r from-white/6 via-white/3 to-transparent blur-sm
                                opacity-0 sm:opacity-100 sm:group-hover:translate-x-8 transition-transform" />

                {/* image area: keep aspect ratio, cover */}
                <div className="w-full aspect-[4/5]">
                  <img
                    src={p.src}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* info */}
                <div className="p-3 sm:p-4 flex flex-col justify-between">
                  <h3 className="text-sm sm:text-base text-zinc-100 font-semibold">
                    {p.title}
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-zinc-300">{p.price}</span>
                    <button className="rounded-full px-3 py-1 text-xs sm:text-sm font-medium text-black
                                       bg-gradient-to-r from-zinc-100 to-slate-200 hover:from-white hover:to-white transition">
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* hover lift (subtle) */}
              <div className="absolute inset-0 rounded-2xl group-hover:scale-[1.02] transition-transform" />
            </article>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


    </div>
  );
};

export default Home;
