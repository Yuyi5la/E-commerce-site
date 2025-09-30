import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
     
      <Navbar />

     
      <main className="flex-1">
        <Outlet />
      </main>

      
      <Footer />
    </div>
  );
};

export default RootLayout;
