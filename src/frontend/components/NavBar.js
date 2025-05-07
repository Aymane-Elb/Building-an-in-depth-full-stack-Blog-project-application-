import React, { useState } from "react";
import { Link } from "react-router-dom";
import GsapButton from "./GsapButton";
import Signalez from "../pages/Signalez";
import CreateAccount from "../pages/CreateAccount";

const NavBar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  
  return (
    <nav className="bg-nav-bar w-screen sticky top-0 z-50 text-nav-tex-color px-6 py-2 flex items-center justify-between">
      {/* Left side - Logo and main navigation links */}
      <div className="flex items-center">
        <img src="/images/logo.jpeg" alt="website logo" className="h-full w-12 m-0 rounded-md" />
        
        <ul className="flex ml-6">
          <li className="inline-block pt-4 pb-4 font-bold hover:text-yellow-500 relative group">
            <Link to="/" className="px-4 relative">
              Accueil
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-right"></span>
            </Link>
          </li>
          <li className="inline-block pt-4 pb-4 font-bold hover:text-yellow-500 relative group">
            <Link to="/Signalez" className="px-4 relative">
            Report a Problem
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
          </li>
          <li className="inline-block pt-4 pb-4 font-bold hover:text-yellow-500 relative group">
            <Link to="/articles-list" className="px-4 relative">
              Reports
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Right side - Login/Create Account link */}
      <div className="flex items-center">
        <div className="relative pt-4 pb-4 font-bold text-yellow-500 hover:text-yellow-400 group"
            onMouseEnter={() => setShowLoginForm(true)}
            onClick={() => setShowLoginForm(true)}
            onMouseLeave={() => setShowLoginForm(false)}>
          <GsapButton text="Login/Create Account" darkMode={true} onClick={()=>setShowLoginForm(true)}/>
          {showLoginForm && (
            <div className="absolute top-full right-0 bg-black bg-opacity-95 text-white rounded shadow-lg z-51 flex flex-row w-max">
              {/* Left side - Sign In */}
              <div className="w-64 p-6 border-r border-gray-700">
                <h2 className="text-lg font-bold mb-4">Sign In</h2>
                <form>
                  <div className="mb-4">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full p-2 bg-transparent border-b border-gray-600 focus:outline-none focus:border-white text-sm"
                    />
                  </div>
                  <div className="mb-6">
                    <input 
                      type="password" 
                      placeholder="Password" 
                      className="w-full p-2 bg-transparent border-b border-gray-600 focus:outline-none focus:border-white text-sm"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <GsapButton text="Login" darkMode={false} />
                  </div>
                  <div className="flex flex-nowrap mt-4">
                    <a href="/Login.js" className="text-xs text-gray-400 hover:text-white">Forgot your password?</a>
                  </div>
                </form>
              </div>
              
              {/* Right side - Why create an account */}
              <div className="w-64 p-6">
                <h2 className="text-lg font-bold mb-4">Why create an account?</h2>
                <ul className="text-sm space-y-3 mb-4">
                  <li className="flex items-start">
                    <span className="mr-2 text-yellow-500">★</span> 
                    <span>It's free</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-yellow-500">★</span> 
                    <span>Participate in the forums</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-yellow-500">★</span> 
                    <span>Updates on the products you use</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-yellow-500">★</span> 
                    <span>Exclusive offers and more</span>
                  </li>
                </ul>
                <div>
                  <GsapButton text="Create an Account" darkMode={false} to="../frontend/pages/CreateAccount" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;