import React, { useState, useEffect } from "react";

export default function NavbarWithSidePanel() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const items = ["Home", "About", "Shop", "BestSellers", "Contact","Login/Register"];

  // filtered items based on search
  const filtered = items.filter((x) =>
    x.toLowerCase().includes(query.toLowerCase())
  );

  // close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Simple Navbar */}
      <header className="w-full bg-white border-b border-black px-4 py-5 flex items-center justify-between relative z-10">
        {/* Left: hamburger */}
        <div
          onClick={() => setOpen(true)}
          className="cursor-pointer text-2xl"
          aria-label="Open menu"
          role="button"
        >
          ☰
        </div>

        {/* Middle */}
        <div className="flex items-center gap-2 font-bold tracking-wider">
          <img src="/logo2.webp" alt="Logo" className="h-10 w-10" />
          ChromeHalo
        </div>

        {/* Right: cart */}
        <div className="h-10 w-10 flex items-center justify-center text-2xl">
          🛒
        </div>
      </header>

      {/* Overlay (dim background) */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Side panel (slides in from the LEFT) */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 transform bg-white border-r border-black p-6
                    transition-transform duration-300 ease-in-out
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/3`}
        aria-hidden={!open}
        aria-labelledby="side-panel-title"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between mb-4">
          <h2 id="side-panel-title" className="text-lg font-semibold">
            Menu
          </h2>

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="text-2xl p-1"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Search box */}
        <div className="mb-4">
          <label className="sr-only" htmlFor="menu-search">Search menu</label>
          <input
            id="menu-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* List */}
        <nav>
          <ul className="space-y-3">
            {filtered.length === 0 ? (
              <li className="text-sm text-gray-500">No results</li>
            ) : (
              filtered.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="block px-2 py-2 rounded hover:bg-black/5"
                    onClick={() => {
                      // example click handler: close panel after selection
                      setOpen(false);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
}
