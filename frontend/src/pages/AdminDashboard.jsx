import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/admin/products"
          className="bg-gray-100 p-6 rounded-lg shadow hover:bg-gray-200"
        >
          Manage Products
        </Link>
        <Link
          to="/admin/orders"
          className="bg-gray-100 p-6 rounded-lg shadow hover:bg-gray-200"
        >
          Manage Orders
        </Link>
        <Link
          to="/admin/users"
          className="bg-gray-100 p-6 rounded-lg shadow hover:bg-gray-200"
        >
          Manage Users
        </Link>
      </div>

      {/* Nested pages render here */}
      <Outlet />
    </div>
  );
}
