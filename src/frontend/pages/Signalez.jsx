import "whatwg-fetch"; // Make sure this is imported if you need fetch polyfill for older browsers
import React, { useCallback, useState } from 'react';
import GsapButton from '../components/GsapButton';
import LocationPicker from '../components/LocationPicker';
import Footer from '../components/Footer';

const Signalez = () => {
  // State for form fields
  const [fullName, setFullName] = useState(''); // Added for 'Full Name' input
  const [city, setCity] = useState('');
  const [problemType, setProblemType] = useState(''); // Added for 'Problem Type' input (maps to 'category' in backend)
  const [description, setDescription] = useState(''); // Added for 'Description' textarea
  const [image, setImage] = useState(null); // Added for 'Photo' file input

  const [location, setLocation] = useState({ lat: null, lng: null });

  // Callback for LocationPicker to update location and city
  const handleLocationChange = useCallback(({ lat, lng, address }) => {
    setLocation({ lat, lng });
    setCity(address); // Set city from LocationPicker's address if available
  }, []);

  // Handler for file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Capture the selected file
    }
  };

  // Main form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission

    // Create FormData object to send text fields and files
    const formData = new FormData();

    // Append text fields
    // Note: 'fullName' is not directly used in the backend Report model,
    // but you can append it if your backend will process it differently
    // or if you plan to add it to the User model.
    // For now, the report is associated with the logged-in user via req.user._id.
    // formData.append('fullName', fullName);

    formData.append('city', city); // City from LocationPicker/input
    formData.append('problemType', problemType); // Maps to 'category' in backend
    formData.append('description', description);

    // Append location coordinates as a JSON string
    if (location.lat !== null && location.lng !== null) {
      formData.append('location', JSON.stringify({ lat: location.lat, lng: location.lng }));
    }

    // Append the image file if selected
    if (image) {
      formData.append('images', image); // 'images' matches the field name in upload.array('images', 3)
    }

    // Get JWT token from localStorage (assuming it's stored there after login)
    const token = localStorage.getItem('token'); // Adjust this if you store token elsewhere

    if (!token) {
      alert('You must be logged in to submit a report.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Important: DO NOT set 'Content-Type': 'multipart/form-data' here.
          // Fetch will automatically set it correctly with the boundary when using FormData.
        },
        body: formData,
      });

      if (!response.ok) {
        // Parse error message from backend
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Report submitted successfully:', result);
      alert('Report submitted successfully!');

      // Optionally, clear the form fields after successful submission
      setFullName('');
      setCity('');
      setProblemType('');
      setDescription('');
      setImage(null);
      setLocation({ lat: null, lng: null });
      // You might need to add a way to clear LocationPicker or reset its state if it holds internal state
      // For file input, resetting its value requires a ref or re-rendering the input,
      // but setting image(null) clears the state.
    } catch (error) {
      console.error('Error submitting report:', error);
      alert(`Error submitting report: ${error.message}`);
    }
  };

  return (
    <>
      <div className='bg-white p-10 mx-auto border-2 border-black m-10 flex flex-col font-mono text-lg text-center justify-center w-screen max-w-5xl h-full'>
        <h2 className="text-2xl font-bold mb-8">Report a Problem</h2>
        <form onSubmit={handleSubmit}> {/* Changed to onSubmit for the form */}
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
              onChange={(e) => setCity(e.target.value)} // Keep direct input possible
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
              onChange={(e) => setProblemType(e.target.value)} // Updated to map to category
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
              onChange={handleFileChange} // Handle file selection
            />
          </div>

          <div className="w-full h-80 mb-20 relative z-0">
            <LocationPicker onLocationChange={handleLocationChange} />
          </div>

          <GsapButton text="Submit Report" darkMode={true} type="submit" /> {/* Changed to type="submit" */}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signalez;