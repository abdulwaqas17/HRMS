import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const CompanyRegister = () => {
  const { id } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subscriptionPlan: "basic",
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
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to load company info."
        );
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
      formData.append("companyEmail", companyData.companyEmail);
      formData.append("companyPhone", companyData.companyPhone);
      formData.append("industry", companyData.industry);
      formData.append("employeeRange", companyData.employeeRange);
      formData.append("companyOwner", companyData.companyOwner);

      // Editable form fields
      Object.entries(formInput).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // POST request
      await axios.post(
        `${import.meta.env.VITE_API_URL}/company-register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Company registered successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader color="#2563eb" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Company Registration
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white shadow-lg rounded-lg p-6"
      >
        {/* Pre-filled disabled fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            disabled
            value={companyData?.companyName}
            className="input-disabled"
          />
          <input
            disabled
            value={companyData?.companyEmail}
            className="input-disabled"
          />
          <input
            disabled
            value={companyData?.companyPhone}
            className="input-disabled"
          />
          <input
            disabled
            value={companyData?.industry}
            className="input-disabled"
          />
          <input
            disabled
            value={companyData?.employeeRange}
            className="input-disabled"
          />
          <input
            disabled
            value={companyData?.companyOwner}
            className="input-disabled"
          />
        </div>

        {/* Editable fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">City *</label>
            <input
              {...register("companyCity", { required: "City is required" })}
              className="input"
              placeholder="City"
            />
            {errors.companyCity && (
              <p className="text-red-500 text-sm">
                {errors.companyCity.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">Country *</label>
            <input
              {...register("companyCountry", {
                required: "Country is required",
              })}
              className="input"
              placeholder="Country"
            />
            {errors.companyCountry && (
              <p className="text-red-500 text-sm">
                {errors.companyCountry.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="label">Address *</label>
          <textarea
            {...register("companyAddress", { required: "Address is required" })}
            className="input"
            placeholder="Full address"
          />
          {errors.companyAddress && (
            <p className="text-red-500 text-sm">
              {errors.companyAddress.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">Subscription Plan</label>
          <select
            {...register("subscriptionPlan", {
              required: "Subscription Plan is required",
            })}
            className="input"
          >
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
            <option value="enterprise">Enterprise</option>
          </select>
          {errors.subscriptionPlan && (
            <p className="text-red-600 text-sm mt-1">
              {errors.subscriptionPlan.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">Company Logo</label>
          <input
            type="file"
            {...register("companyLogo", {
              required: "Company logo is required",
              validate: {
                acceptedFormats: (fileList) =>
                  ["image/jpeg", "image/png"].includes(fileList?.[0]?.type) ||
                  "Only PNG/JPG allowed",
                fileSize: (fileList) =>
                  fileList?.[0]?.size <= 5 * 1024 * 1024 || "Max size is 5MB",
              },
            })}
            accept="image/png, image/jpeg"
            className="hidden"
          />
          {errors.companyLogo && (
            <p className="mt-1 text-sm text-red-600">
              {errors.companyLogo.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Submitting..." : "Complete Registration"}
        </button>
      </form>
    </div>
  );
};

export default CompanyRegister;
