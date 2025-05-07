import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white w-full">
      <div className="w-full flex flex-col lg:flex-row justify-between px-6 py-8">
        {/* Logo and Company Description */}
        <div className="mb-6 lg:mb-0 max-w-md">
          <div className="flex items-center mb-3">
            <img 
              src="/images/logo.jpeg" 
              alt="Website Logo" 
              className="h-12 w-12 rounded-md mr-3" 
            />
            <h3 className="text-xl font-bold">Your Company</h3>
          </div>
          <p className="text-gray-400">
            Committed to providing excellent service and solutions for our community.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 lg:mb-0">
          <h4 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-1">Quick Links</h4>
          <ul>
            <li className="mb-2 hover:text-yellow-400 transition duration-200">
              <Link to="/" className="inline-block">Accueil</Link>
            </li>
            <li className="mb-2 hover:text-yellow-400 transition duration-200">
              <Link to="/Signalez" className="inline-block">Report a Problem</Link>
            </li>
            <li className="mb-2 hover:text-yellow-400 transition duration-200">
              <Link to="/articles-list" className="inline-block">Reports</Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="w-full border-t border-gray-700 px-6 py-4">
        <p className="text-sm text-gray-400">
          © {currentYear} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;