import React from "react";

const Signup = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 px-6">
      {/* Container */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-200">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center mb-6 tracking-tight bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
          Create Account
        </h2>

        {/* Form */}
        <form className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gray-100 via-white to-gray-200 text-gray-800 font-bold py-2 rounded-lg shadow hover:shadow-lg transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-gray-900 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </section>
  );
};

export default Signup;
