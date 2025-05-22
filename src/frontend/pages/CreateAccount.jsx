import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import GsapButton from '../components/GsapButton';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const CreateAccount = () => {
  const [fullName, setFullName] = useState(''); // State for Full Name
  const [email, setEmail] = useState('');       // State for Email Address
  const [password, setPassword] = useState('');   // State for Password
  const [phoneNumber, setPhoneNumber] = useState(''); // State for Phone Number

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const userData = {
      username: fullName, // Map Full Name to username
      email,
      password,
      phoneNumber,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        // If response is not OK (e.g., 400 Bad Request, 409 Conflict)
        throw new Error(data.message || 'Registration failed');
      }

      console.log('Account created successfully:', data);
      alert('Account created successfully!');

      // Redirect to the home page after successful registration
      navigate('/'); // Use navigate to redirect to the home page

      // Clear form fields (optional, since we're redirecting)
      setFullName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');

    } catch (error) {
      console.error('Error creating account:', error);
      alert(`Error creating account: ${error.message}`);
    }
  };

  return (
    <div className="sticky max-w-md mx-auto bg-white p-10 item-center justify-center rounded-2xl shadow-2xl mt-20">
      <h2 className="text-3xl font-black mb-8 text-center text-black">Create Account</h2>
      <form onSubmit={handleSubmit}> {/* Use onSubmit on the form */}
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-normal text-black mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Si Hmed"
              className="bg-transparent focus:outline-none border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-normal text-black mb-1">Email Address</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="bg-transparent focus:outline-none  border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-sm font-normal text-black mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                className="w-full bg-transparent focus:outline-none focus:border-yellow-300 border border-yellow-300 rounded-md py-2 px-3 text-yellow-300 font-black focus:ring-2 focus:ring-yellow-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-300 hover:text-yellow-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-normal text-black mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+123456789"
              className="bg-transparent focus:outline-none  border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              // Optional: Add 'required' if phone number is mandatory
            />
          </div>

          <div className="mt-8 flex justify-center">
            <GsapButton
              text={'Submit'}
              darkMode={true}
              type="submit" // Set type to submit
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;