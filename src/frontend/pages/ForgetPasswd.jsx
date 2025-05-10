import React from 'react';
import GsapButton from '../components/GsapButton';

const CreateAccount = () => {
  
  const handleSubmit = () => {
    console.log('Form submitted!');
  };
  
  return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-2xl shadow-2xl mt-20">
      <h2 className="text-3xl font-bold mb-8 text-center text-black">Create Account</h2>
      <div className="space-y-6">
        <div className="flex flex-col">
          <label className="text-sm font-normal text-black mb-1">Email Address</label>
          <input
            type="email"
            placeholder="example@email.com"
            className="bg-transparent focus:outline-none  border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-normal text-black mb-1">Code</label>
          <input
            type="phone"
            placeholder="********"
            className="bg-transparent focus:outline-none  border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        
        <div className="mt-8 flex justify-center">
          <GsapButton 
            onClick={handleSubmit} 
            text={'Continue'}
            darkMode={true}
          />
            
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;