import React from "react";
import { useForm } from "react-hook-form";
import { FiX, FiMail, FiBriefcase } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

const InviteModal = ({ isOpen, onClose, request, onSubmit , loading}) => {



  if (!isOpen) return null;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      emailSubject: `Invitation to join HRPro - ${request?.companyName || ""}`,
      emailBody: `Dear ${request?.adminName || "Admin"},\n\nWe're pleased to invite you to join our HR management platform. Please click the link below to complete your registration.\n\nRegistration Link: [http://localhost:5173/company-invite/${request?._id}]\n\nBest regards,\nHRPro Team`,
    },
  });

  console.log(request?.companyEmail);
  console.log(watch('emailSubject'));
  console.log(watch('emailBody'));
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-semibold">Send Invitation</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <FiBriefcase className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                {request?.companyName}
              </h4>
              <p className="text-sm text-gray-500">{request?.companyEmail}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                disabled
                {...register("emailSubject", {
                  required: "Subject is required",
                })}
                className={`w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.emailSubject ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.emailSubject && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.emailSubject.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="5"
                disabled
                {...register("emailBody", {
                  required: "Message is required",
                })}
                className={`w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.emailBody ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.emailBody && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.emailBody.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                
                {loading ? (
                <div className="flex items-center">
                  <ClipLoader
                    color={"#ffffff"}
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <span className="ml-2">Sending Invite...</span>
                </div>
              ) : (
                <span className="flex items-center "><FiMail className="mr-2" />
                Send Invitation</span>
              )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
