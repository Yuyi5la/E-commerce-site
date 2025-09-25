// pages/UserProfile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          console.error("Error fetching user:", data.message);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleNavigation = () => {
    if (user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
     
      navigate("/shop"); 
    }
  };

  //  Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading profile...
      </div>
    );
  }

  //  Not logged in state
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        No user found. Please log in.
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-500 to-gray-700 flex items-center justify-center text-white text-2xl font-bold shadow">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user.name}
            </h1>
            <p className="text-gray-600 text-sm mt-1">Role: {user.role}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-5">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Full Name
            </p>
            <p className="font-medium text-gray-800">{user.name}</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Email Address
            </p>
            <p className="font-medium text-gray-800">{user.email}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleNavigation}
            className={`w-full py-2.5 rounded-lg shadow transition ${
              user.role === "admin"
                ? "bg-black-300 hover:bg-black-700 text-white"
                : "bg-sky-300 hover:bg-sky-700 text-white"
            }`}
          >
            {user.role === "admin" ? "Go to Admin Dashboard" : "Continue Shopping"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-slate-500 text-white py-2.5 rounded-lg shadow hover:bg-red-300 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
