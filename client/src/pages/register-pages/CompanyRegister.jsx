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
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Company not found"
        );
        navigate("/not-found")
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
      formData.append("adminName", companyData.adminName);

        // Editable fields (non-file)
    Object.entries(formInput).forEach(([key, value]) => {
      if (key !== "companyLogo") {
        formData.append(key, value);
      }
    });

    console.log(formInput);
    console.log(formInput.companyLogo);
    

    // File field (must be separate!)
    if (formInput.companyLogo?.[0]) {
      formData.append("companyLogo", formInput.companyLogo[0]);
    }

      // POST request
      await axios.post(
        `${import.meta.env.VITE_API_URL}/company-register/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Company registered successfully!");
      navigate("/");
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
            value={companyData?.adminName}
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
          <select {...register("subscriptionPlan")} className="input">
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>

        <div>
          <label className="label">Company Logo</label>
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
                  fileList?.[0]?.size <= 5 * 1024 * 1024 || "Max size is 5MB",
              },
            })}
            accept="image/png, image/jpeg , image/jpg"
            className="input"
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
          {isSubmitting ? (
            <div className="flex items-center">
              <ClipLoader
                color={"#ffffff"}
                loading={isSubmitting}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <span className="ml-2">Submitting...</span>
            </div>
          ) : (
            "Complete Registration"
          )}
        </button>
      </form>
    </div>
  );
};

export default CompanyRegister;
