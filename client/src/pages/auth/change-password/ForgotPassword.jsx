import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const ForgotPasswordImage = () => {
  return (

   <div className="md:w-1/2 bg-blue-600 flex items-center justify-center p-8">
        <div className="max-w-md">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
            alt="Password reset" 
            className="w-full h-auto rounded-lg shadow-xl"
          />
          <h2 className="text-white text-2xl font-bold mt-6">Reset Your Password</h2>
          <p className="text-blue-100 mt-2">
            We'll help you get back into your professional account quickly and securely.
          </p>
        </div>
      </div>
  )
}

const ForgotPasswordForm = () => {

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Add your forgot password logic here
    setSubmitted(true);
  };

    
  
  return (
<div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {submitted ? 'Check Your Email' : 'Forgot Password'}
          </h1>
          
          {!submitted ? (
            <>
              <p className="text-gray-600 mb-6">
                Enter the email address associated with your account and we'll send you a link to reset your password.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="mt-3 text-lg text-gray-600">
                We've sent a password reset link to <span className="font-medium">{email}</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or <button 
                  onClick={() => setSubmitted(false)}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  try another email address
                </button>
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
     
   
  )
}

export {ForgotPasswordImage,ForgotPasswordForm}