// src/frontend/pages/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Assuming you have lucide-react installed
import GsapButton from '../components/GsapButton';

const ResetPassword = () => {
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation(); // To get URL parameters

  // On component mount, try to extract the token from the URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      setResetCode(token); // Pre-fill the reset code if it's in the URL
      setMessage('Reset code found in URL. Please enter your new password.');
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match!');
      return;
    }

    if (!resetCode) {
      setError('Please enter the reset code.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/resetpassword/${resetCode}`, {
        method: 'PUT', // Use PUT for updating the password
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }), // Send only the new password
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      setMessage(data.message || 'Your password has been reset successfully!');
      setResetCode('');
      setNewPassword('');
      setConfirmPassword('');

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login'); // Assuming your login page is at /login
      }, 3000);

    } catch (err) {
      console.error('Error resetting password:', err);
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="sticky max-w-md mx-auto bg-white p-10 item-center justify-center rounded-2xl shadow-2xl mt-20">
      <h2 className="text-3xl font-black mb-8 text-center text-black">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Reset Code Input */}
          <div className="flex flex-col">
            <label className="text-sm font-normal text-black mb-1">Reset Code</label>
            <input
              type="text"
              placeholder="Enter the code from your email"
              className="bg-transparent focus:outline-none border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
            />
          </div>

          {/* New Password Input */}
          <div className="flex flex-col relative">
            <label className="text-sm font-normal text-black mb-1">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="********"
                className="w-full bg-transparent focus:outline-none border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-300 hover:text-yellow-300"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password Input */}
          <div className="flex flex-col relative">
            <label className="text-sm font-normal text-black mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="********"
                className="w-full bg-transparent focus:outline-none border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-300 hover:text-yellow-300"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Display messages */}
          {message && <p className="text-center text-sm mt-4 p-2 rounded-md bg-green-100 text-green-700">{message}</p>}
          {error && <p className="text-center text-sm mt-4 p-2 rounded-md bg-red-100 text-red-700">{error}</p>}

          <div className="mt-8 flex justify-center">
            <GsapButton
              text={'Reset Password'}
              darkMode={true}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;