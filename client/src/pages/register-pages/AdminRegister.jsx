// components/AdminRegister.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import {
  FaUpload,
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaVenusMars,
  FaBuilding,
} from "react-icons/fa"; // React Icons

const AdminRegister = () => {
  const { id } = useParams();
  const [companyInfo, setCompanyInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch, // Used to watch for changes in companyLogo for display
    formState: { errors },
  } = useForm();

  const companyLogoWatch = watch("profileImage"); // Watch the profileImage file input

  // 🚀 Fetch company details (name and logo)
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-register-company/${id}`
        );
        setCompanyInfo(data.data); // Assuming data.data contains companyName and companyLogo
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Company details not found."
        );
        navigate(error?.response?.data?.link || "/not-found")
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id, navigate]);

  // 📤 Handle form submission for admin registration
  const onSubmit = async (formInput) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append all text fields
      Object.entries(formInput).forEach(([key, value]) => {
        if (key !== "profileImage") {
          // Exclude file initially
          formData.append(key, value);
        }
      });

      // Append profile image if selected
      if (formInput.profileImage?.[0]) {
          console.log(formInput.profileImage);
        formData.append("profileImage", formInput.profileImage[0]);
      }

      

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create/admin/${id}`, // Endpoint for admin registration
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(
        response.data.message || "Admin account registered successfully!"
      );
      navigate(response.data.link || "/admin-dashboard"); // Navigate to admin dashboard or login
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Admin registration failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ClipLoader color="#2563eb" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          {/* Header Section with Company Info */}
          <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-8 text-white text-center flex flex-col items-center justify-center">
            {companyInfo?.companyLogo && (
              <img
                src={companyInfo.companyLogo}
                alt={`${companyInfo.companyName} Logo`}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4 object-contain bg-white p-1"
              />
            )}
            <h1 className="text-3xl font-extrabold mb-2">
              <FaBuilding className="inline-block mr-2" />
              {companyInfo?.companyName || "Your Company"}
            </h1>
            <p className="text-xl font-light opacity-90">
              Welcome to the Admin Account Setup
            </p>
            <p className="mt-4 text-lg text-indigo-100 max-w-2xl">
              All set! Create your admin account now to access the dashboard.
              We've also shared this link with your company email for
              convenience.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 sm:p-10 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <FaUser className="inline-block mr-1 text-blue-500" /> First
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className={`w-full px-4 py-2.5 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <FaUser className="inline-block mr-1 text-blue-500" /> Last
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  className={`w-full px-4 py-2.5 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <FaEnvelope className="inline-block mr-1 text-blue-500" />{" "}
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-4 py-2.5 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <FaPhone className="inline-block mr-1 text-blue-500" /> Phone{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+\s()-]*$/,
                      message: "Invalid phone number format",
                    },
                  })}
                  className={`w-full px-4 py-2.5 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <FaLock className="inline-block mr-1 text-blue-500" />{" "}
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full px-4 py-2.5 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <FaVenusMars className="inline-block mr-1 text-blue-500" />{" "}
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  {...register("gender", { required: "Gender is required" })}
                  className={`w-full px-4 py-2.5 border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <FaCalendarAlt className="inline-block mr-1 text-blue-500" />{" "}
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dob"
                  {...register("dob", {
                    required: "Date of Birth is required",
                    // You can add more date validation if needed, e.g., age
                  })}
                  className={`w-full px-4 py-2.5 border ${
                    errors.dob ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                />
                {errors.dob && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.dob.message}
                  </p>
                )}
              </div>
            </div>

            {/* Profile Image (Optional) */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaUpload className="inline-block mr-1 text-blue-500" /> Profile
                Image (Optional)
              </label>
              <div className="flex flex-col items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {companyLogoWatch && companyLogoWatch[0] ? (
                      <img
                        src={URL.createObjectURL(companyLogoWatch[0])}
                        alt="Profile Preview"
                        className="w-16 h-16 object-cover rounded-full mb-2"
                      />
                    ) : (
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                    )}
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    {...register("profileImage", {
                      validate: {
                        acceptedFormats: (fileList) =>
                          !fileList?.[0] ||
                          ["image/jpeg", "image/png", "image/jpg"].includes(
                            fileList?.[0]?.type
                          ) ||
                          "Only PNG/JPG/JPEG allowed",
                        fileSize: (fileList) =>
                          !fileList?.[0] ||
                          fileList?.[0]?.size <= 5 * 1024 * 1024 ||
                          "Max size is 5MB",
                      },
                    })}
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                  />
                </label>
              </div>
              {errors.profileImage && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.profileImage.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <ClipLoader
                      color="#ffffff"
                      loading={isSubmitting}
                      size={20}
                      className="mr-2"
                    />
                    Creating Account...
                  </>
                ) : (
                  "Create Admin Account"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
