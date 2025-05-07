import React from 'react';
import GsapButton from '../components/GsapButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Footer from '../components/Footer';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <>
    <div className="max-w-md mx-auto bg-yellow-200 p-10 rounded-2xl shadow-2xl mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-black ">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-semibold text-black mb-1">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Si Hmed"
            required
            className="bg-transparent focus:outline-none focus:border-blue-500 border border-black rounded-md py-2 px-3 text-black font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            required
            className="bg-transparent focus:outline-none focus:border-blue-500 border border-black rounded-md py-2 px-3 text-black font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
            required
            minLength="6"
            className="bg-transparent focus:outline-none focus:border-blue-500 border border-black rounded-md py-2 px-3 text-black font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
           <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-1/2 text-gray-600 hover:text-gray-800"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="+123456789"
            required
            pattern="[0-9]{10,15}"
            className="bg-transparent focus:outline-none focus:border-blue-500 border border-black rounded-md py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <GsapButton text="Submit" darkMode={true} />
        </div>
      </form>
    </div>
    </>
  );
};

export default CreateAccount;
