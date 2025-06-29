import "whatwg-fetch";
import React, { useCallback, useState, useRef, useEffect } from 'react';
import GsapButton from '../components/GsapButton';
import LocationPicker from '../components/LocationPicker';
import Footer from '../components/Footer';

const Signalez = () => {
  const [city, setCity] = useState('');
  const [problemType, setProblemType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getAuthToken = () => {
    try {
      const token =
        localStorage.getItem('token') ||
        localStorage.getItem('userToken') ||
        JSON.parse(localStorage.getItem('user') || '{}').token;
      return token || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    console.log('=== TOKEN DEBUG ON MOUNT ===');
    console.log('Token exists:', !!token);
    console.log('Token value (first 20 chars):', token ? token.substring(0, 20) + '...' : 'null');
    console.log('LocalStorage keys:', Object.keys(localStorage));
    console.log('=== END TOKEN DEBUG ===');
  }, []);

  const handleLocationChange = useCallback(({ lat, lng, address }) => {
    setLocation({ lat, lng });
    if (address) setCity(address);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, GIF, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = e => setImagePreview(e.target.result);
    reader.readAsDataURL(file);

    setImage(file);
    setErrorMessage('');
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setUploadProgress(0);

    // Validate required fields
    if (!city.trim() || !problemType.trim() || !description.trim() || location.lat === null || location.lng === null) {
      setErrorMessage('All fields including location are required.');
      return;
    }

    setIsLoading(true);
    const token = getAuthToken();

    if (!token) {
      setErrorMessage('You must be logged in to submit a report. Please log in and try again.');
      setIsLoading(false);
      return;
    }

    try {
      setUploadProgress(20);
      
      // Create FormData with all the report data
      const formData = new FormData();
      
      // Add text fields - match the backend expectations
      formData.append('title', city.trim()); // Using city as title for now
      formData.append('category', problemType.trim());
      formData.append('description', description.trim());
      formData.append('address', city.trim());
      
      // Add location as JSON string
      formData.append('location', JSON.stringify({
        lat: location.lat,
        lng: location.lng
      }));
      
      // Add image file if present
      if (image) {
        formData.append('images', image); // Backend expects 'images' field name
        setUploadProgress(40);
      }

      setUploadProgress(60);

      // Send everything to backend in one request
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type header - let browser set it for FormData
        },
        body: formData,
      });

      setUploadProgress(90);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `HTTP ${response.status}: Failed to submit report`);
      }

      const result = await response.json();
      setUploadProgress(100);
      
      // Success - clear form
      setSuccessMessage('Report submitted successfully!');
      setCity('');
      setProblemType('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
      setLocation({ lat: null, lng: null });
      if (fileInputRef.current) fileInputRef.current.value = '';

      console.log('Report submitted successfully:', result);

    } catch (err) {
      console.error('Submit error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setUploadProgress(0);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='bg-white p-10 mx-auto border-2 border-black m-10 flex flex-col font-mono text-lg text-center justify-center w-screen max-w-5xl h-full'>
        <h2 className="text-2xl font-bold mb-8">Report a Problem</h2>

     
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        {isLoading && (
          <div className="mb-4">
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 flex items-center justify-center"
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress > 10 && (
                  <span className="text-xs text-white font-bold">{uploadProgress}%</span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              {uploadProgress < 40
                ? 'Preparing data...'
                : uploadProgress < 70
                ? 'Uploading image...'
                : uploadProgress < 95
                  ? 'Saving report...'
                  : 'Finalizing...'}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='flex flex-row items-center justify-between mb-6'>
            <label className='w-1/3 text-left ml-4'>City *</label>
            <input
              className='border border-gray-100 p-2 w-2/3 text-yellow-800 border-white focus:border-yellow-600 focus:outline-none'
              required
              placeholder="Enter city or select location on map"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className='flex flex-row items-center justify-between mb-6'>
            <label className='w-1/3 text-left ml-4'>Problem Type *</label>
            <select
              className='border border-gray-100 p-2 w-2/3 text-yellow-800 border-white focus:border-yellow-600 focus:outline-none'
              required
              value={problemType}
              onChange={(e) => setProblemType(e.target.value)}
            >
              <option value="">Select a problem type</option>
              <option value="Roads & Sidewalks">Roads & Sidewalks</option>
              <option value="Waste & Sanitation">Waste & Sanitation</option>
              <option value="Public Lighting">Public Lighting</option>
              <option value="Water & Drainage">Water & Drainage</option>
              <option value="Green Spaces">Green Spaces</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className='flex flex-row items-center justify-between mb-6'>
            <label className='w-1/3 text-left ml-4'>Description *</label>
            <textarea
              className='border border-gray-100 p-2 w-2/3 resize-none text-yellow-800 focus:border-yellow-600 focus:outline-none'
              rows="4"
              required
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className='flex flex-row items-start justify-between mb-8'>
            <label className='w-1/3 text-left ml-4 mt-2'>Photo</label>
            <div className='w-2/3'>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className='w-full mb-2'
              />

              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-32 object-cover border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              )}

              {image && (
                <p className='text-sm text-green-600 mt-1'>
                  Selected: {image.name} ({(image.size / 1024 / 1024).toFixed(2)}MB)
                </p>
              )}

              <p className='text-xs text-gray-500 mt-1'>
                Supported formats: JPG, PNG, GIF, WebP (Max: 5MB)
              </p>
            </div>
          </div>

          <div className="w-full mb-10">
            <label className='text-center mb-2'>Select your Location *</label>
            <div className="w-full h-80 relative z-0 border border-black p-0">
              <LocationPicker onLocationChange={handleLocationChange} />
            </div>
            {location.lat && location.lng && (
              <p className='text-sm text-green-600 mt-2'>
                Selected coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            )}
          </div>

          <GsapButton
            text={isLoading ? 'Submitting...' : 'Submit Report'}
            darkMode={true}
            type="submit"
            disabled={isLoading}
            className="mt-20"
          />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signalez;