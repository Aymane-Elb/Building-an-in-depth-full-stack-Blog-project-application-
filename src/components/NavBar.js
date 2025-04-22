import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  
  return (
    <nav className="bg-nav-bar text-nav-tex-color px-6 py-4 flex items-center justify-between gap-6">
      <img src="/images/logo.jpeg" alt="website logo" className="h-full w-12 m-0 rounded-md" />
      <ul>
        <li className="inline-block pt-4 pb-4 font-bold hover:text-yellow-500 relative group">
          <Link to="/" className="pl-6 pr-8 relative">
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-right"></span>
          </Link>
        </li>
        <li className="inline-block pt-4 pb-4 font-bold hover:text-yellow-500 relative group">
          <Link to="/about" className="pl-6 pr-8 relative">
            About
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
          </Link>
        </li>
        <li className="inline-block pt-4 pb-4 font-bold hover:text-yellow-500 relative group">
          <Link to="/articles-list" className="pl-6 pr-8 relative">
            Reports
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
          </Link>
        </li>
        <li className="inline-block pt-4 pb-4 font-bold hover:text-yellow-500 relative group"
            onMouseEnter={() => setShowLoginForm(true)}
            onClick={() => setShowLoginForm(true)}
            onMouseLeave={() => setShowLoginForm(false)}>
          <Link to="#" className="pl-6 pr-8 relative">
            Login/Create Account
            <span className="relative left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left "></span>
          </Link>
          
          {showLoginForm && (
            <div className="relative top-full mt-2 bg-nav-bar text-nav-tex-color shadow-lg z-50 flex flex-row">
              {/* Left side - Sign In */}
              <div className="w-full p-2 border-r border-gray-700">
                <h2 className="text-base font-bold mb-3">Sign In</h2>
                <form>
                  <div className="mb-3">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full p-2 bg-transparent  focus:outline-none focus:border-white border-2 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <input 
                      type="password" 
                      placeholder="Password" 
                      className="w-full p-2 bg-transparent focus:border-white border-2 outline-none text-sm"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="px-3 py-1 border border-white rounded flex items-center text-sm">
                      Login <span className="ml-1">→</span>
                    </button>
                    <a href="#" className="text-xs text-gray-400 hover:text-nav-tex-color">Forgot your password?</a>
                  </div>
                </form>
              </div>
              
              {/* Right side - Why create an account */}
              <div className="w-full p-4">
                <h2 className="text-base font-bold mb-3">Why create an account?</h2>
                <ul className="text-sm">
                  <li className="flex items-start mb-2">
                    <span className="mr-2 text-yellow-500">★</span> It's free
                  </li>
                  <li className="flex items-start mb-2">
                    <span className="mr-2 text-yellow-500">★</span> Participate in the forums
                  </li>
                  <li className="flex items-start mb-2">
                    <span className="mr-2 text-yellow-500">★</span> Updates on the products you use
                  </li>
                  <li className="flex items-start mb-2">
                    <span className="mr-2 text-yellow-500">★</span> Exclusive offers and more
                  </li>
                </ul>
                <button className="mt-3 px-3 py-1 border border-white rounded flex items-center text-sm">
                  Create an Account <span className="ml-1">→</span>
                </button>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;