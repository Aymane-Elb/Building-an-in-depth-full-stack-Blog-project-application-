import "whatwg-fetch";
import React, { useCallback, useState } from 'react';
import GsapButton from '../components/GsapButton';
import LocationPicker from '../components/LocationPicker';
import Footer from '../components/Footer';

const Signalez = () => {
  // Form field states
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [problemType, setProblemType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // Location state from LocationPicker
  const [location, setLocation] = useState({ lat: null, lng: null });

  // UI state for feedback
  const [isLoading, setIsLoading] = useState(false); // New: Tracks submission status
  const [successMessage, setSuccessMessage] = useState(''); // New: For successful submissions
  const [errorMessage, setErrorMessage] = useState('');     // New: For displaying errors

  // Callback for LocationPicker to update location and city
  const handleLocationChange = useCallback(({ lat, lng, address }) => {
    setLocation({ lat, lng });
    setCity(address);
  }, []);

  // Handler for file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Main form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');

    // Input validation (client-side - add more as needed)
    if (!fullName || !city || !problemType || !description) {
        setErrorMessage('Please fill in all required text fields.');
        return;
    }
    if (location.lat === null || location.lng === null) {
        setErrorMessage('Please select a location on the map.');
        return;
    }
    // If you always require an image:
    // if (!image) {
    //     setErrorMessage('Please upload an image for the report.');
    //     return;
    // }

    setIsLoading(true); // Start loading state

    const formData = new FormData();
    formData.append('fullName', fullName); // Still appending for potential future use or debugging
    formData.append('city', city);
    formData.append('problemType', problemType);
    formData.append('description', description);

    if (location.lat !== null && location.lng !== null) {
      formData.append('location', JSON.stringify({ lat: location.lat, lng: location.lng }));
    }

    if (image) {
      formData.append('images', image);
    }

    const token = localStorage.getItem('token');

    if (!token) {
      setErrorMessage('You must be logged in to submit a report.');
      setIsLoading(false); // Stop loading if not logged in
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Use backend error message if available, otherwise a generic one
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Report submitted successfully:', result);
      setSuccessMessage('Report submitted successfully! Thank you for your contribution.');

      // Clear form fields after successful submission
      setFullName('');
      setCity('');
      setProblemType('');
      setDescription('');
      setImage(null);
      setLocation({ lat: null, lng: null });
      // To clear file input, you might need a ref:
      // if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (error) {
      console.error('Error submitting report:', error);
      setErrorMessage(`Error submitting report: ${error.message}`);
    } finally {
      setIsLoading(false); // End loading state regardless of success or failure
    }
  };

  return (
    <>
      <div className='bg-white p-10 mx-auto border-2 border-black m-10 flex flex-col font-mono text-lg text-center justify-center w-screen max-w-5xl h-full'>
        <h2 className="text-2xl font-bold mb-8">Report a Problem</h2>

        {/* Display success/error messages */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='flex flex-row items-center justify-between mb-6'>
            <label className='w-1/3 text-left ml-4'>Full Name</label>
            <input
              className='border border-gray-100 p-2 w-2/3 text-yellow-800 border-white focus:border-yellow-600'
              required
              placeholder="Enter your name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className='flex flex-row items-center justify-between mb-6'>
            <label className='w-1/3 text-left ml-4'>City</label>
            <input
              className='border border-gray-100 p-2 w-2/3 text-yellow-800 border-white focus:border-yellow-600'
              required
              placeholder="Enter your city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className='flex flex-row items-center justify-between mb-6'>
            <label className='w-1/3 text-left ml-4'>Problem Type</label>
            <input
              className='border border-gray-100 p-2 w-2/3 text-yellow-800 border-white focus:border-yellow-600'
              required
              placeholder="E.g. Road damage, broken light..."
              type="text"
              value={problemType}
              onChange={(e) => setProblemType(e.target.value)}
            />
          </div>

          <div className='flex flex-row items-center justify-between mb-6'>
            <label className='w-1/3 text-left ml-4'>Description</label>
            <textarea
              className='border border-gray-100 p-2 w-2/3 resize-none text-yellow-800 focus:border-yellow-600'
              rows="4"
              required
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className='flex flex-row items-center justify-between mb-8'>
            <label className='w-1/3 text-left ml-4 '>Photo</label>
            <input
              className='w-2/3'
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              // You might want to add a ref here to clear the file input:
              // ref={fileInputRef}
            />
          </div>

          <div className="w-full h-80 mb-20 relative z-0">
            <LocationPicker onLocationChange={handleLocationChange} />
          </div>

          <GsapButton
            text={isLoading ? 'Submitting...' : 'Submit Report'} // Change button text
            darkMode={true}
            type="submit"
            disabled={isLoading} // Disable button while loading
          />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signalez;