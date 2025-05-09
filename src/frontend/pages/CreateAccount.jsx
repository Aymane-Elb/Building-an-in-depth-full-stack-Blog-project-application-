import React from 'react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import GsapButton from '../components/GsapButton';

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = () => {
    console.log('Form submitted!');
  };
  
  return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-2xl shadow-2xl mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-black">Create Account</h2>
      <div className="space-y-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-black mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Si Hmed"
            className="bg-transparent focus:outline-none focus:border-blue-300 border border-yellow-300 rounded-md py-2 px-3 text-yellow-300 font-bold focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-black mb-1">Email Address</label>
          <input
            type="email"
            placeholder="example@email.com"
            className="bg-transparent focus:outline-none focus:border-blue-300 border border-yellow-300 rounded-md py-2 px-3 text-yellow-300 font-bold focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div className="flex flex-col relative">
          <label className="text-sm font-semibold text-black mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              className="w-full bg-transparent focus:outline-none focus:border-blue-300 border border-yellow-300 rounded-md py-2 px-3 text-yellow-300 font-bold focus:ring-2 focus:ring-blue-400"
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
          <label className="text-sm font-semibold text-black mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="+123456789"
            className="bg-transparent focus:outline-none focus:border-blue-300 border border-yellow-300 rounded-md py-2 px-3 text-yellow-300 focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div className="mt-8 flex justify-center">
          <GsapButton 
            onClick={handleSubmit} 
            text={'Submit'}
            darkMode={true}
          />
            
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;