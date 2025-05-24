// src/frontend/pages/ForgetPasswd.jsx
import React, { useState } from 'react';
import GsapButton from '../components/GsapButton';
// import { useNavigate } from 'react-router-dom'; // You might navigate to a "check email" page or a reset form later

const ForgetPasswd = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // To display success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send the email in the request body
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setMessage(data.message || 'If an account with that email exists, a password reset code has been sent to your email.');
      setEmail(''); // Clear the email field

    } catch (error) {
      console.error('Error requesting password reset:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="sticky max-w-md mx-auto bg-white p-10 item-center justify-center rounded-2xl shadow-2xl mt-20">
      <h2 className="text-3xl font-black mb-8 text-center text-black">Forgot Password</h2>
      <form onSubmit={handleSubmit}> {/* Use onSubmit on the form */}
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-normal text-black mb-1">Email Address</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="bg-transparent focus:outline-none  border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
              value={email} // Controlled component
              onChange={(e) => setEmail(e.target.value)} // Update state on change
              required
            />
          </div>
          {/* Removed 'Code' input field from this page as it's for the next step */}
          {/* <div className="flex flex-col">
            <label className="text-sm font-normal text-black mb-1">Code</label>
            <input
              type="text" // Changed from phone to text for generic code
              placeholder="********"
              className="bg-transparent focus:outline-none  border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
            />
          </div> */}

          {message && <p className="text-center text-sm mt-4 p-2 rounded-md bg-gray-100 text-gray-700">{message}</p>}

          <div className="mt-8 flex justify-center">
            <GsapButton
              text={'Send Reset Code'} // Changed text
              darkMode={true}
              type="submit" // Ensure type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswd;