import React from "react";
//import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Login=()=> {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white-100">
      <div className="bg-white-400 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to your account</h2>
        <form>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-white text-black transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
