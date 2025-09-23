import React, { useEffect } from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/home";
import About from "./pages/about";
import Shop from "./pages/shop";
import Contact from "./pages/contact";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Checkout from "./pages/checkout";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import { isTokenExpired } from "./utils/auth";

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="checkout" element={<Checkout />} />
       

        {/* Protected Routes */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
