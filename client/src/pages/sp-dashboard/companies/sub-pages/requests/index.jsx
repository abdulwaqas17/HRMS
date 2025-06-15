import React, { useState } from "react";
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

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("pending");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Sample data - replace with API calls
  const [requests, setRequests] = useState([
    {
      id: 1,
      companyName: "EduSoft Solutions",
      contactPerson: "Bilal Ahmed",
      email: "bilal@edusoft.com",
      phone: "+92 300 1234567",
      employeeCount: "15-20",
      requestedOn: "2023-07-15",
      status: "pending",
      message: "Interested in your HRMS for our growing team",
    },
    {
      id: 2,
      companyName: "BuildIt Constructions",
      contactPerson: "Sara Khan",
      email: "sara@buildit.com",
      phone: "+92 321 9876543",
      employeeCount: "50-100",
      requestedOn: "2023-07-12",
      status: "pending",
      message: "Need system for our construction workers",
    },
    {
      id: 3,
      companyName: "FoodExpress",
      contactPerson: "Ali Raza",
      email: "ali@foodexpress.com",
      phone: "+92 345 6789012",
      employeeCount: "30-50",
      requestedOn: "2023-07-10",
      status: "rejected",
      message: "Looking for HR solution for our delivery staff",
    },
  ]);

  // Filter requests
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || request.status === filter;

    return matchesSearch && matchesFilter;
  });

  // Handle actions
  const handleApprove = (request) => {
    setSelectedRequest(request);
    setShowInviteModal(true);
  };

  const handleReject = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  const handleInvite = (inviteData) => {
    // API call to send invitation
    console.log(
      "Sending invitation to:",
      selectedRequest.email,
      "with data:",
      inviteData
    );
    setRequests(
      requests.map((req) =>
        req.id === selectedRequest.id ? { ...req, status: "invited" } : req
      )
    );
    setShowInviteModal(false);
  };

  const handleAddCompany = (companyData) => {
    // API call to add company manually
    console.log("Adding company:", companyData);
    setShowAddModal(false);
  };

  const refreshData = () => {
    // API call to refresh data
    console.log("Refreshing data...");
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
              onClick={refreshData}
              className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              <FiRefreshCw className="mr-2" />
              Refresh
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
                {filteredRequests.length > 0 ? (
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
                              {request.email}
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
                              {request.contactPerson}
                            </div>
                            <div className="text-sm text-gray-500">
                              {request.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.employeeCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiClock className="mr-1 text-gray-400" />
                          {request.requestedOn}
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
                                onClick={() => handleReject(request.id)}
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
