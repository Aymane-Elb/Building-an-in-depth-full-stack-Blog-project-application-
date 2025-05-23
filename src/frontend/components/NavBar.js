import React, { useState } from "react";
import { Link } from "react-router-dom";
import GsapButton from "./GsapButton";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const NavBar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  // State to control visibility of the logout button (optional, for explicit hover)
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const navigate = useNavigate();
  const { user, login, logout, loading } = useAuth(); // Get user, login, logout, loading from context

  // Function to handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log('Login successful:', data);
      alert('Login successful!');

      login(data.data); // Call login function to update global state
      setShowLoginForm(false); // Close the login form
      navigate('/'); // Optionally redirect

      setLoginEmail('');
      setLoginPassword('');

    } catch (error) {
      console.error('Error during login:', error);
      alert(`Error during login: ${error.message}`);
    }
  };

  const handleLogout = () => {
    logout(); // Call logout function from context
    alert('Logged out successfully!');
    navigate('/'); // Redirect to home or login page after logout
  };

  // Render nothing while authentication state is being loaded
  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <nav className="bg-nav-bar w-screen sticky top-0 z-50 text-nav-tex-color px-6 py-2 flex items-center justify-between ">
      {/* Left side - Logo and main navigation links */}
      <div className="flex items-center">
        <img src="/images/logo.jpeg" alt="website logo" className="h-full w-14 mr-2" />

        <ul className="flex ml-6">
          <li className="inline-block pt-4 pb-4 font-bold hover:text-yellow-500 relative group">
            <Link to="/" className="px-4 relative">
              Accueil
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-right"></span>
            </Link>
          </li>
          <li className="inline-block pt-4 pb-4 font-bold hover:text-yellow-500 relative group">
            <Link to="/Signalez" className="px-4 relative">
            Signalez
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
          </li>
          <li className="inline-block pt-4 pb-4 font-bold hover:text-yellow-500 relative group">
            <Link to="/UrbanIssuesPage" className="px-4 relative">
              Reports
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
          </li>
          <li className="inline-block pt-4 pb-4 font-bold hover:text-yellow-500 relative group">
            <Link to="/About" className="px-4 relative">
              About us
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Right side - Login/Create Account or User Name & Logout */}
      <div className="flex items-center">
        {user ? ( // If user is logged in
          <div
            className="flex items-center space-x-2" // Use flex and space-x-2 for spacing
            onMouseEnter={() => setShowLogoutButton(true)} // Show logout on hover of this container
            onMouseLeave={() => setShowLogoutButton(false)} // Hide logout on mouse leave
          >
            <GsapButton text={user.username} darkMode={true} /> {/* Display username */}
            {showLogoutButton && ( // Conditionally render logout button on hover
              <GsapButton
                text="Logout"
                darkMode={true}
                onClick={handleLogout}
                className="ml-2" // Add some margin if needed, though space-x-2 handles it
              />
            )}
          </div>
        ) : ( // If user is NOT logged in
          <div className="relative pt-4 pb-4 font-bold text-yellow-500 hover:text-yellow-400 group"
              onMouseEnter={() => setShowLoginForm(true)}
              onClick={() => setShowLoginForm(true)}
              onMouseLeave={() => setShowLoginForm(false)}>
            <GsapButton text="Authenticate / Register" darkMode={true} />
            {showLoginForm && (
              <div className="absolute top-full right-0 bg-white bg-opacity-95 text-black rounded shadow-lg z-51 flex flex-row w-max">
                {/* Left side - Sign In */}
                <div className="w-64 p-6 border-r border-gray-700">
                  <h2 className="text-lg font-bold mb-4">Sign In</h2>
                  <form onSubmit={handleLoginSubmit}>
                    <div className="mb-4">
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-2 bg-transparent border-b border-gray-600 focus:outline-none focus:border-yellow-400 text-sm"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 bg-transparent border-b border-gray-600 focus:outline-none focus:border-yellow-400 text-sm"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <GsapButton text="Login" darkMode={true} type="submit" />
                    </div>
                    <div className="flex flex-nowrap mt-4">
                      <a href="/ForgetPasswd" className="text-xs text-black hover:text-yellow-500">Forgot your password?</a>
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
                    <GsapButton text="Create an Account" darkMode={true} to='/CreateAccount' />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;