// controllers/companyRequests/createCompanyRequest.js

const CompanyRequest = require("../../../models/companies/req-company.model");
const RegCompany = require("../../../models/companies/reg-company.model");
const { isValidEmail, isValidPhone } = require("../../../utils/validations");

// Controller to handle company request creation
const createCompanyRequest = async (req, res) => {
  try {
    // Step 1: Extract data from request body
    const {
      companyName,
      companyEmail,
      companyPhone,
      companyAdmin,
      industry,
      employeeRange,
      message,
    } = req.body;

    // Step 2: Optional - Backend validation before mongoose (double-check frontend)
    if (
      !companyName ||
      !companyEmail ||
      !companyPhone ||
      !companyAdmin ||
      !industry ||
      !employeeRange
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Email format check
    if (!isValidEmail(companyEmail)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid email format (e.g., you@example.com)",
        });
    }

    //  Phone format check
    if (!isValidPhone(companyPhone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number (include country code, e.g., +92...)",
      });
    }

    // Check if company already exists (by name or email)
    const isDuplicateName =
      (await CompanyRequest.exists({ companyName })) ||
      (await RegCompany.exists({ companyName }));

    if (isDuplicateName) {
      return res.status(409).json({
        success: false,
        message: "A company with this name already exists",
      });
    }

    const isDuplicateEmail =
      (await CompanyRequest.exists({ companyEmail })) ||
      (await RegCompany.exists({ companyEmail }));

    if (isDuplicateEmail) {
      return res.status(409).json({
        success: false,
        message: "A company with this email already exists",
      });
    }

    // Step 3: Create new request document
    const newRequest = new CompanyRequest({
      companyName,
      companyEmail,
      companyPhone,
      companyAdmin,
      industry,
      employeeRange,
      message, // Optional
    });

    // Step 4: Save to DB
    await newRequest.save();

    // Step 5: Send response
    return res.status(201).json({
      success: true,
      message: "Company request submitted successfully",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error creating company request:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = createCompanyRequest;

/*
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/company-request', // 👈 your backend route
        {
          companyName: data.companyName,
          companyEmail: data.companyEmail,
          companyPhone: data.companyPhone,
          companyAdmin: data.companyAdmin,
          industry: data.industry,
          employeeRange: parseInt(data.employeeRange),
          message: data.message || '',
        }
      );

      if (response.data.success) {
        alert('🎉 Request submitted successfully!');
        reset(); // clear form
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Company Registration Request
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            
            <div>
              <label className="block text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                {...register('companyName', { required: true })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter company name"
              />
              {errors.companyName && <p className="text-red-500 text-sm">Company name is required</p>}
            </div>

  
            <div>
              <label className="block text-gray-700 mb-2">Industry Type</label>
              <select
                {...register('industry', { required: true })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select industry</option>
                <option value="IT">Information Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Construction">Construction</option>
              </select>
              {errors.industry && <p className="text-red-500 text-sm">Industry is required</p>}
            </div>

       
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Contact Person Name</label>
                <input
                  type="text"
                  {...register('companyAdmin', { required: true })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Full name"
                />
                {errors.companyAdmin && <p className="text-red-500 text-sm">Admin name is required</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  {...register('companyEmail', {
                    required: true,
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="company@email.com"
                />
                {errors.companyEmail && <p className="text-red-500 text-sm">Valid email is required</p>}
              </div>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  {...register('companyPhone', { required: true })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="+92 300 1234567"
                />
                {errors.companyPhone && <p className="text-red-500 text-sm">Phone number is required</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Estimated Employees</label>
                <select
                  {...register('employeeRange', { required: true })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select range</option>
                  <option value="10">1-10</option>
                  <option value="50">11-50</option>
                  <option value="200">51-200</option>
                  <option value="500">201-500</option>
                  <option value="1000">500+</option>
                </select>
                {errors.employeeRange && <p className="text-red-500 text-sm">Select employee range</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Additional Requirements</label>
              <textarea
                rows="4"
                {...register('message')}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Any special requirements or notes"
              ></textarea>
            </div>


            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('terms', { required: true })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label className="ml-2 text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">You must agree before submitting</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;

*/
