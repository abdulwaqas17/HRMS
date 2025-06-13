import React from 'react';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa'; // Using React Icons for a modern look, added FaArrowLeft

const NotFoundPage = () => {
  const handleGoBack = () => {
    window.history.back(); // This navigates to the previous page in the browser history
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="text-center p-8 md:p-12 bg-white rounded-lg shadow-xl max-w-lg mx-auto">
        <FaExclamationTriangle className="text-blue-600 text-6xl mx-auto mb-6" />
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Oops! The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <button
          onClick={handleGoBack}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-300"
        >
          <FaArrowLeft className="mr-2 -ml-1 h-5 w-5" /> {/* Changed icon to an arrow */}
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;