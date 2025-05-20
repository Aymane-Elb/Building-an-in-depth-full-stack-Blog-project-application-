import React, { useCallback } from 'react';
import {useState} from 'react';
import GsapButton from '../components/GsapButton';
import LocationPicker from '../components/LocationPicker';
import Footer from '../components/Footer';

const Signalez = () => {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null });

  const handleLocationChange = useCallback(({ lat, lng, city }) => {
    setLocation({ lat, lng });
    setCity(city);
  },[]);
  const handleSubmit = () => {
    console.log({ city, location });
    alert(`Report submitted for ${city} at coordinates: ${location.lat}, ${location.lng}`);
  };
  return (
    <>
    {/* Changed max-w-3xl to max-w-5xl */}
    <div className='bg-white p-10 mx-auto border-2 border-black m-10 flex flex-col font-mono text-lg text-center justify-center w-screen max-w-5xl h-full'>
      <h2 className="text-2xl font-bold mb-8">Report a Problem</h2>
      <form>
        <div className='flex flex-row items-center justify-between mb-6'>
          <label className='w-1/3 text-left ml-4'>Full Name</label>
          <input className='border p-2 w-2/3 text-yellow-800 border-white focus:border-yellow-600' required placeholder="Enter your name" type="text" />
        </div>

        <div className='flex flex-row items-center justify-between mb-6'>
          <label className='w-1/3 text-left ml-4'>City</label>
          <input className='border p-2 w-2/3 text-yellow-800 border-white focus:border-yellow-600' required placeholder="Enter your city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>

        <div className='flex flex-row items-center justify-between mb-6'>
          <label className='w-1/3 text-left ml-4'>Problem Type</label>
          <input className='border p-2 w-2/3 text-yellow-800 border-white focus:border-yellow-600' required placeholder="E.g. Road damage, broken light..." type="text" />
        </div>

        <div className='flex flex-row items-center justify-between mb-6'>
          <label className='w-1/3 text-left ml-4'>Description</label>
          <textarea className='border p-2 w-2/3 resize-none text-yellow-800' rows="4" required placeholder="Describe the issue in detail..."></textarea>
        </div>

        <div className='flex flex-row items-center justify-between mb-8'>
          <label className='w-1/3 text-left ml-4 '>Photo</label>
          <input className='w-2/3' type="file" accept="image/*" />
        </div>

        {/* This div was added in a previous response to contain the map */}
        <div className="w-full h-80 mb-20 relative z-0">
          <LocationPicker onLocationChange={handleLocationChange} />
        </div>

        <GsapButton text="Submit Report" darkMode={true} onClick={handleSubmit} />
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Signalez;