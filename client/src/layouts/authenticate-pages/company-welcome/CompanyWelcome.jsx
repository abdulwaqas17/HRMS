// import React from "react";

// const CompanyWelcome = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="text-center max-w-md w-full">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
        //   <img
        //     src="https://images.seeklogo.com/logo-png/38/1/company-logo-png_seeklogo-389186.png"
        //     alt="Company Logo"
        //     className="h-20 w-20 rounded-[50%] shadow-lg"
        //   />
//         </div>

//         {/* Welcome Text */}
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">
//           Welcome Company User
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Please login to your account using your respective role.
//         </p>

//         {/* Role Buttons */}
//         <div className="flex flex-col sm:flex-row justify-center gap-4">
//           <button className="w-full sm:w-auto px-[15px] py-[8px]">Admin Login</button>
//           <button className="w-full sm:w-auto px-[15px] py-[8px]">Admin Login</button>
//           <button className="w-full sm:w-auto px-[15px] py-[8px]">Admin Login</button>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyWelcome;
import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-center p-4">
      {/* Logo Container */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-24 h-24 md:w-[150px] md:h-[150px]  rounded-full shadow-lg flex items-center justify-center mb-6 border-[4px] border-dashed border-gray-400 p-[10px]">
          <img
            src="https://images.seeklogo.com/logo-png/38/1/company-logo-png_seeklogo-389186.png"
            alt="Company Logo"
            className="h-full w-full rounded-[50%] object-fill shadow-lg"
          />
        </div>
        
        {/* Welcome Text */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          Welcome to HRMS Portal
        </h1>
        <p className="text-gray-600 text-center max-w-md">
          Login to your account to manage human resources, employees, and company operations efficiently.
        </p>
      </div>

      {/* Role Selection Buttons */}
      <div className="w-full max-w-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Admin Button */}
          <button
            onClick={() => navigate("/admin-login")}
            className="bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 py-4 px-6 rounded-xl shadow-sm transition-all duration-300 flex flex-col items-center hover:shadow-md hover:-translate-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">Admin</span>
            <span className="text-xs text-gray-500 mt-1">System Administrator</span>
          </button>

          {/* HR Button */}
          <button
            onClick={() => navigate("/hr-login")}
            className="bg-white hover:bg-purple-50 border border-purple-200 text-purple-700 py-4 px-6 rounded-xl shadow-sm transition-all duration-300 flex flex-col items-center hover:shadow-md hover:-translate-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="font-medium">HR</span>
            <span className="text-xs text-gray-500 mt-1">Human Resources</span>
          </button>

          {/* Employee Button */}
          <button
            onClick={() => navigate("employee-login")}
            className="bg-white hover:bg-green-50 border border-green-200 text-green-700 py-4 px-6 rounded-xl shadow-sm transition-all duration-300 flex flex-col items-center hover:shadow-md hover:-translate-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="font-medium">Employee</span>
            <span className="text-xs text-gray-500 mt-1">Company Staff</span>
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Select your role to continue to the login page
        </p>
      </div>
    </div>
  );
};

export default RoleSelectionPage;