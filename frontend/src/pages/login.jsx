import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.dispatchEvent(new Event("login"));

        toast.success("Login successful!");

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 sm:bg-gradient-to-br sm:from-white sm:via-gray-300 sm:to-gray-400 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-gray-100 via-white to-gray-200 text-gray-800 font-bold py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Links section */}
        <div className="mt-8 flex flex-col gap-4 text-center sm:text-left sm:flex-row sm:items-center sm:justify-between">
          <a
            href="/forgot-password"
            className="text-sm text-gray-600 hover:underline"
          >
            Forgot password?
          </a>

          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-gray-900 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
