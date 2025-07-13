import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/company-request`,
        {
          companyName: data.companyName,
          companyEmail: data.companyEmail,
          companyPhone: data.companyPhone,
          companyAdmin: data.companyAdmin,
          industry: data.industry,
          employeeRange: data.employeeRange,
          message: data.message || "",
        }
      );

      toast.success(response.data.message || "Your request has been submitted");
      reset();
    } catch (error) {
      console.error("Request error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
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
            {/* Company Name */}
            <div>
              <label className="block text-gray-700 mb-2">Company Name</label>
              <input
                {...register("companyName", {
                  required: "Company name is required",
                  minLength: {
                    value: 3,
                    message: "At least 3 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only letters allowed",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Industry */}
            <div>
              <label className="block text-gray-700 mb-2">Industry Type</label>
              <select
                {...register("industry", { required: "Industry is required" })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select industry</option>
                <option value="IT">Information Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Other">Other</option>
              </select>
              {errors.industry && (
                <p className="text-red-500 text-sm">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* Contact Person & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Company Owner
                </label>
                <input
                  {...register("companyAdmin", {
                    required: "Admin name is required",
                    minLength: { value: 3, message: "Minimum 3 characters" },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only letters allowed",
                    },
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Full name"
                />
                {errors.companyAdmin && (
                  <p className="text-red-500 text-sm">
                    {errors.companyAdmin.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  {...register("companyEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="company@email.com"
                />
                {errors.companyEmail && (
                  <p className="text-red-500 text-sm">
                    {errors.companyEmail.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone & Employees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  {...register("companyPhone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/, // E.164 format
                      message: "Invalid phone number (e.g. +923001234567)",
                    },
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="+92 300 1234567"
                />
                {errors.companyPhone && (
                  <p className="text-red-500 text-sm">
                    {errors.companyPhone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Estimated Employees
                </label>
                <select
                  {...register("employeeRange", {
                    required: "Employee range is required",
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select range</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-100">51-100</option>
                  <option value="101-200">101-200</option>
                  <option value="200+">200+</option>
                </select>
                {errors.employeeRange && (
                  <p className="text-red-500 text-sm">
                    {errors.employeeRange.message}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 mb-2">
                Additional Requirements
              </label>
              <textarea
                rows="4"
                {...register("message")}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Any special requirements"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center">
              <input
                {...register("terms", { required: true })}
                type="checkbox"
                id="terms"
                className="w-4 h-4"
              />
              <label htmlFor="terms" className="ml-2 text-gray-700">
                I agree to the
                <a href="#" className="text-blue-600 underline">
                  Terms
                </a>
                and
                <a href="#" className="text-blue-600 underline">
                  Privacy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">Please accept the terms</p>
            )}

            {/* Submit Button with Loader */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
            >
              {loading ? (
                <>
                  <ClipLoader size={20} color="#fff" />
                  <span className="ml-2">Submitting...</span>
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
