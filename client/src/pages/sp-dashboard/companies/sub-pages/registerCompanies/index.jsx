import DashboardLayout from "@/layouts/authenticate-pages/dashboard/layout";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [registeredCompanies, setRegisteredCompanies] = useState(null);

  useEffect(() => {
    const getRegisteredCompanies = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_API_URL}/registered-companies`
        );

        let companies = response.data.data;

        setRegisteredCompanies(companies);

        console.log(response.data);

      } catch (error) {
        console.log("error:", error);
        const errorMessage =
          error.response?.data?.message || "Fetching data failed.";
        toast.error(errorMessage);
      }
    };

    getRegisteredCompanies();
  }, []);

  // Sample data - replace with API call
  // const companies = [
  //   {
  //     id: 1,
  //     CompanyLogo: "https://via.placeholder.com/40",
  //     name: "TechSolutions PK",
  //     email: "contact@tech.com",
  //     owner: "Ahmed Khan",
  //     employees: 42,
  //     status: "active",
  //     joined: "2023-05-15",
  //     subscriptionPlan: "Premium",
  //   },
  
  //   // ... more companies
  // ];

  // Filter companies based on search and filter
  const filteredCompanies = registeredCompanies?.filter((company) => {
    let companyAdmin = company.admin ? company.admin.firstName + " " + company.admin.lastName : 'Admin name';
    const matchesSearch =
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.companyEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companyAdmin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || company.status === filter;

    return matchesSearch && matchesFilter;
  });
console.log(filteredCompanies);

  return (
    <DashboardLayout title="Service Provider" short="SP">
      {/* Filters and Search */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search companies..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <FiFilter className="text-gray-500 mr-2" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <FiDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Companies Table */}
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
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  subscriptionPlan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Joined
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
              {filteredCompanies ?  filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={company.companyLogo}
                          alt={company.companyName}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {company.companyName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {company.companyEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{company.admin ? company.admin.firstName + " " + company.admin.lastName : 'Admin name'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {company.employees.length}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        company.status === "active"
                          ? "bg-green-100 text-green-800"
                          : company.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        company.subscriptionPlan === "Premium"
                          ? "bg-purple-100 text-purple-800"
                          : company.subscriptionPlan === "Enterprise"
                          ? "bg-blue-100 text-blue-800"
                          : company.subscriptionPlan === "Standard"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {company.subscriptionPlan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(company.registerAt, 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="View"
                      >
                        <FiEye className="h-5 w-5" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                        title="Edit"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )): 'Loading ...'}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to
                <span className="font-medium">10</span> of
                <span className="font-medium">  {registeredCompanies?.length}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  Previous
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Companies;
