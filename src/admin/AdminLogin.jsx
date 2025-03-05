import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5656/api/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
    //   alert("Login Successful!");
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm transform transition-all hover:scale-105 duration-500 ease-in-out">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-800 text-sm">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
