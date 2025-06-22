import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiMail,
  FiX,
  FiCheck,
  FiPlus,
  FiRefreshCw,
  FiClock,
  FiUser,
  FiBriefcase,
} from "react-icons/fi";
import InviteModal from "./components/InviteModal";
import AddCompanyModal from "./components/AddCompanyModal";
import DashboardLayout from "@/layouts/authenticate-pages/dashboard/layout";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("pending");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [companiesRequest, setCompaniesRequest] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCompaniesRequest = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_API_URL}/companies-request`
        );

        let companies = response.data.data;

        setCompaniesRequest(companies);

        console.log(response.data);
      } catch (error) {
        console.log("error:", error);
        const errorMessage =
          error.response?.data?.message || "Fetching data failed.";
        toast.error(errorMessage);
      }
    };

    getCompaniesRequest();
  }, []);

  // // Sample data - replace with API calls
  // const [requests, setRequests] = useState([
  //   {
  //     id: 1,
  //     companyName: "EduSoft Solutions",
  //     adminName: "Bilal Ahmed",
  //     companyEmail: "bilal@edusoft.com",
  //     companyPhone: "+92 300 1234567",
  //     employeeRange: "15-20",
  //     requestedAt: "2023-07-15",
  //     status: "pending",
  //     message: "Interested in your HRMS for our growing team",
  //   }
  // ]);

  // Filter requests
  const filteredRequests = companiesRequest?.filter((request) => {
    const matchesSearch =
      request.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.companyEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || request.status === filter;

    return matchesSearch && matchesFilter;
  });

  // Handle actions
  const handleApprove = (request) => {
    setSelectedRequest(request);
    setShowInviteModal(true);
  };

  const handleReject = (id) => {
    console.log(id);

    setCompaniesRequest(
      companiesRequest.map((req) =>
        req._id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  console.log(selectedRequest, "selectedRequest");

  const handleInvite = async (inviteData) => {
    let ownerToken = localStorage.getItem("ownerToken");
    if (!ownerToken) {
      toast.error("Owner token not found, Login Fisrt");

      setTimeout(() => {
        navigate("/owner-login");
      }, 1500);
      return;
    }
    if (!selectedRequest) {
      toast.error("No company selected to invite.");
      return;
    }

    console.log(inviteData);
    console.log(inviteData.emailBody);

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/company-invite/${selectedRequest._id}`,
        {
          email: selectedRequest.companyEmail,
          emailSubject: inviteData.emailSubject,
          emailBody: inviteData.emailBody,
        },
        {
          headers: {
            authorization: `Bearer ${ownerToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            `Invite sent to ${selectedRequest.companyName} successfully`
        );

        setCompaniesRequest(
          companiesRequest.map((req) =>
            req._id === selectedRequest._id
              ? { ...req, status: "invited" }
              : req
          )
        );
        setShowInviteModal(false);
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Invite error:", error);
      const errorMessage =
        error.response?.data?.message || "Invite failed. Please try again.";
      toast.error(errorMessage);
      if (errorMessage === "Unauthorized" || "Invalid Token") {
        setTimeout(() => {
          navigate("/owner-login");
        }, 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = (companyData) => {
    // API call to add company manually
    console.log("Adding company:", companyData);
    setShowAddModal(false);
  };

  const refreshData = async () => {
     try {
        let response = await axios.get(
          `${import.meta.env.VITE_API_URL}/companies-request`
        );

        let companies = response.data.data;

        setCompaniesRequest(companies);

        console.log(response.data);
      } catch (error) {
        console.log("error:", error);
        const errorMessage =
          error.response?.data?.message || "Fetching data failed.";
        toast.error(errorMessage);
      }
  };

  return (
    <DashboardLayout title="Service Provider" short="SP">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Company Requests
            </h1>
            <p className="text-gray-600">
              Manage incoming requests and send invitations
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              disabled={loading}
              onClick={refreshData}
              className=" bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >{loading ? (
                <div className="flex items-center">
                  <ClipLoader
                    color={"#ffffff"}
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <span className="ml-2">Refreashing ...</span>
                </div>
              ) : (
                <span className="flex items-center"><FiRefreshCw className="mr-2" /> Refreash</span>
              )}
              
              
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <FiPlus className="mr-2" />
              Add Company
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search requests..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <FiFilter className="text-gray-500 mr-2" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="invited">Invited</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Employees
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Requested On
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests?.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <FiBriefcase className="h-5 w-5" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {request.companyName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {request.companyEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                            <FiUser className="h-4 w-4" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm text-gray-900">
                              {request.adminName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {request.companyPhone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.employeeRange}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiClock className="mr-1 text-gray-400" />

                          {format(request.requestedAt, "MMM d, yyyy")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            request.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : request.status === "invited"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {request.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(request)}
                                className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                title="Approve & Invite"
                              >
                                <FiCheck className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleReject(request._id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                title="Reject"
                              >
                                <FiX className="h-5 w-5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() =>
                              console.log("View details", request.id)
                            }
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="View Details"
                          >
                            <FiMail className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No requests found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invite Modal */}
        <InviteModal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          request={selectedRequest}
          onSubmit={handleInvite}
          loading={loading}
        />

        {/* Add Company Modal */}
        <AddCompanyModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddCompany}
        />
      </div>
    </DashboardLayout>
  );
};

export default Requests;
