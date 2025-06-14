import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OtpVerifyImage = () => {
  return (

    <div className="md:w-1/2 bg-blue-600 flex items-center justify-center p-8">
        <div className="max-w-md">
          <img 
            src="https://images.unsplash.com/photo-1607749111659-e1c8e05f5f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
            alt="OTP verification" 
            className="w-full h-auto rounded-lg shadow-xl"
          />
          <h2 className="text-white text-2xl font-bold mt-6">Secure Verification</h2>
          <p className="text-blue-100 mt-2">
            Enter the verification code sent to your email to continue.
          </p>
        </div>
      </div>
  )
}

const OtpVerifyForm = () => {

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verified, setVerified] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value === '' || (value.length === 1 && /^[0-9]$/.test(value))) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto focus to next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    console.log('OTP submitted:', otpCode);
    // Add your OTP verification logic here
    setVerified(true);
  };
    
  
  return (

  <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {verified ? 'Verified Successfully!' : 'Enter Verification Code'}
          </h1>
          
          {!verified ? (
            <>
              <p className="text-gray-600 mb-6">
                We've sent a 6-digit code to your email. Please enter it below to verify your identity.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      required
                      className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  ))}
                </div>

                <div className="text-sm text-gray-500">
                  Didn't receive a code? <button className="font-medium text-blue-600 hover:text-blue-500">Resend code</button>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Verify Code
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
                Your email has been verified successfully!
              </p>
              <div className="mt-6">
                <Link
                  to="/reset-password"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue to Reset Password
                </Link>
              </div>
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

export {OtpVerifyImage,OtpVerifyForm}