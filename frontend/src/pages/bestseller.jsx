import React from "react";

const Bestseller = () => {
  const products = [
    { id: 1, name: "Shirt" },
    { id: 2, name: "Shoes" }
  ];

  return (
    <div>
      <h2 className="text-5xl md:text-6xl font-extrabold uppercase text-black tracking-wide drop-shadow-lg">Best Sellers</h2>

      <div>
        {products.map((product) => {
          console.log(product); // shows each product in console
          return (
            <div key={product.id}>
              {product.name}
            </div>
          );
        })}
      </div>

    </div>
    
  );
};

export default Bestseller;
