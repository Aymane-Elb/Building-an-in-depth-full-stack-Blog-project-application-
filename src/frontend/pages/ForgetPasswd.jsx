import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GsapButton from '../components/GsapButton';

const ForgetPasswd = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong. Please try again.');
            }

            setMessage(data.message || 'If an account with that email exists, a password reset code has been sent to your email.');
            setEmail(''); // Clear the email field

            // If the backend returns a reset token, redirect to reset password page
            if (data.resetToken) {
                setTimeout(() => {
                    navigate(`/reset-password/${data.resetToken}`);
                }, 2000);
            }

        } catch (error) {
            console.error('Error requesting password reset:', error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sticky max-w-md mx-auto bg-white p-10 item-center justify-center rounded-2xl shadow-2xl mt-20">
            <h2 className="text-3xl font-black mb-8 text-center text-black">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-normal text-black mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            className="bg-transparent focus:outline-none border border-yellow-300 rounded-md py-2 px-3 text-black font-black focus:ring-2 focus:ring-yellow-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
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
                    
                    <div className="mt-4 flex justify-center">
                        <GsapButton
                            text={isLoading ? 'Sending...' : 'Send Reset Code'}
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

export default ForgetPasswd;