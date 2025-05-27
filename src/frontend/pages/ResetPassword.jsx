// src/frontend/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GsapButton from '../components/GsapButton';

const ResetPassword = () => {
    const { resetToken } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        code: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setMessage('Error: Passwords do not match');
            setIsLoading(false);
            return;
        }

        // Validate password strength
        if (formData.password.length < 6) {
            setMessage('Error: Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/auth/resetpassword/${resetToken}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: formData.code,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong. Please try again.');
            }

            setMessage('Password reset successful! You have been logged in.');
            
            // Store token if user is automatically logged in
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            // Redirect to dashboard or login after successful reset
            setTimeout(() => {
                navigate('/dashboard'); // or wherever you want to redirect
            }, 2000);

        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sticky max-w-md mx-auto bg-white p-10 item-center justify-center rounded-2xl shadow-2xl mt-20">
            <h2 className="text-3xl font-black mb-8 text-center text-black">Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-normal text-black mb-1">Reset Code</label>
                        <input
                            type="text"
                            name="code"
                            placeholder="Enter 6-digit code"
                            className="bg-transparent focus:outline-none border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
                            value={formData.code}
                            onChange={handleChange}
                            maxLength="6"
                            required
                        />
                        <p className="text-xs text-gray-600 mt-1">Enter the 6-digit code sent to your email</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-normal text-black mb-1">New Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                            className="bg-transparent focus:outline-none border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
                            value={formData.password}
                            onChange={handleChange}
                            minLength="6"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-normal text-black mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            className="bg-transparent focus:outline-none border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            minLength="6"
                            required
                        />
                    </div>

                    {message && (
                        <p className={`text-center text-sm mt-4 p-2 rounded-md ${
                            message.includes('Error') 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-green-100 text-green-700'
                        }`}>
                            {message}
                        </p>
                    )}

                    <div className="mt-8 flex justify-center">
                        <GsapButton
                            text={isLoading ? 'Resetting...' : 'Reset Password'}
                            darkMode={true}
                            type="submit"
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;