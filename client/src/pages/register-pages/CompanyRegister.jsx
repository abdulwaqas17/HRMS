import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const CompanyRegister = () => {
  const { id } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subscriptionPlan: "Basic",
    },
  });

  // 🚀 Fetch initial company data
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-company-request/${id}`
        );
        setCompanyData(data.data);
        console.log(data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Company not found");
        console.log(error);
        navigate(error?.response?.data?.link || "/not-found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  // 📤 Handle form submission
  const onSubmit = async (formInput) => {
    if (!companyData) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      // Manual fields
      formData.append("companyName", companyData.companyName);
      formData.append("companyNameSlug", companyData.companyNameSlug);
      formData.append("companyEmail", companyData.companyEmail);
      formData.append("companyPhone", companyData.companyPhone);
      formData.append("industry", companyData.industry);
      formData.append("employeeRange", companyData.employeeRange);
      formData.append("companyAdmin", companyData.companyAdmin);

      // Editable fields (non-file)
      Object.entries(formInput).forEach(([key, value]) => {
        if (key !== "companyLogo") {
          formData.append(key, value);
        }
      });

      // File field (must be separate!)
      if (formInput.companyLogo?.[0]) {
        console.log(formInput.companyLogo);

        formData.append("companyLogo", formInput.companyLogo[0]);
      }

      // POST request
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}/company-register/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(
        response.data.message || "Company registered successfully!"
      );
      const fullUrl = response.data.link || "/";
      const relativePath = new URL(fullUrl).pathname;

      navigate(relativePath); // ✅ '/admin-register/68739d54ea52a39753acf287'
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed.");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Complete Your Company Registration
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Please fill in the remaining details to complete your company
            profile
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 bg-white shadow-xl rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <h2 className="text-2xl font-semibold">Company Information</h2>
            <p className="opacity-90">Please verify your details</p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Pre-filled disabled fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  disabled
                  value={companyData?.companyName}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Email
                </label>
                <input
                  disabled
                  value={companyData?.companyEmail}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Phone
                </label>
                <input
                  disabled
                  value={companyData?.companyPhone}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <input
                  disabled
                  value={companyData?.industry}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee Range
                </label>
                <input
                  disabled
                  value={companyData?.employeeRange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Name
                </label>
                <input
                  disabled
                  value={companyData?.companyAdmin}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>

            {/* Editable fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("companyCity", { required: "City is required" })}
                  className={`w-full px-4 py-2.5 border ${
                    errors.companyCity ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter your city"
                />
                {errors.companyCity && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.companyCity.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("companyCountry", {
                    required: "Country is required",
                  })}
                  className={`w-full px-4 py-2.5 border ${
                    errors.companyCountry ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter your country"
                />
                {errors.companyCountry && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.companyCountry.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("companyAddress", {
                  required: "Address is required",
                })}
                rows={3}
                className={`w-full px-4 py-2.5 border ${
                  errors.companyAddress ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter your company's full address"
              />
              {errors.companyAddress && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.companyAddress.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subscription Plan
                </label>
                <select
                  {...register("subscriptionPlan")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Logo <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      {...register("companyLogo", {
                        required: "Company logo is required",
                        validate: {
                          acceptedFormats: (fileList) =>
                            ["image/jpeg", "image/png", "image/jpg"].includes(
                              fileList?.[0]?.type
                            ) || "Only PNG/JPG/JPEG allowed",
                          fileSize: (fileList) =>
                            fileList?.[0]?.size <= 5 * 1024 * 1024 ||
                            "Max size is 5MB",
                        },
                      })}
                      accept="image/png, image/jpeg, image/jpg"
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.companyLogo && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.companyLogo.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <ClipLoader
                      color="#ffffff"
                      loading={isSubmitting}
                      size={20}
                      className="mr-2"
                    />
                    Processing...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegister;
