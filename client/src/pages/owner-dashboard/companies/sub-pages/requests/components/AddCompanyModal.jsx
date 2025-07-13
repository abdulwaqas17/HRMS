import React from "react";
import { useForm } from "react-hook-form";
import {
  FiX,
  FiMail,
  FiUser,
  FiBriefcase,
  FiPhone,
  FiUsers,
} from "react-icons/fi";
import { ClipLoader } from "react-spinners";

const AddCompanyModal = ({ isOpen, onClose, onSubmit,isSubmiting }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-semibold">Add New Company</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit((data) => onSubmit(data, reset))} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiBriefcase className="text-gray-400" />
              </div>
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
                type="text"
                className={`pl-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter company name"
              />
            </div>
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Owner
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                {...register("companyAdmin", {
                    required: "Admin name is required",
                    minLength: { value: 3, message: "Minimum 3 characters" },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only letters allowed",
                    },
                  })}
                type="text"
                className={`pl-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.contactPerson ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter contact name"
              />
            </div>
           {errors.companyAdmin && (
                  <p className="text-red-500 text-sm">
                    {errors.companyAdmin.message}
                  </p>
                )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                 {...register("companyEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                  type="email"
                  className={`pl-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter email"
                />
              </div>
              {errors.companyEmail && (
                  <p className="text-red-500 text-sm">
                    {errors.companyEmail.message}
                  </p>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="text-gray-400" />
                </div>
                <input
                {...register("companyPhone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/, // E.164 format
                      message: "Invalid phone number (e.g. +923001234567)",
                    },
                  })}
                  type="tel"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone"
                />
                {errors.companyPhone && (
                  <p className="text-red-500 text-sm">
                    {errors.companyPhone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Indurty
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUsers className="text-gray-400" />
              </div>
              <select
                {...register("industry", { required: "Industry is required" })}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="IT">IT</option>
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Count
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUsers className="text-gray-400" />
              </div>
              <select
                {...register("employeeRange", {
                    required: "Employee range is required",
                  })}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="1-10">1-10 Employees</option>
                <option value="11-50">11-50 Employees</option>
                <option value="51-100">51-100 Employees</option>
                <option value="101-200">101-200 Employees</option>
                <option value="200+">200+ Employees</option>
              </select>
              {errors.employeeRange && (
                  <p className="text-red-500 text-sm">
                    {errors.employeeRange.message}
                  </p>
                )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isSubmiting ? (
                <div className="flex items-center">
                  <ClipLoader
                    color={"#ffffff"}
                    loading={isSubmiting}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <span className="ml-2">Adding Company ...</span>
                </div>
              ) : (
                "Add Company"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyModal;
