// import React, { useState, useMemo } from 'react';
// import { FaInbox,FaSearch, FaFilter, FaPlusCircle, FaTimesCircle, FaPaperPlane, FaBuilding, FaUser, FaBriefcase, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'; // React Icons

// // Initial mock data for company requests
// const initialRequests = [
//   {
//     id: 1,
//     companyName: 'Innovate Solutions',
//     industry: 'Software Development',
//     employees: '50-200',
//     contactPerson: 'Sarah Chen',
//     contactEmail: 'sarah.c@innovate.com',
//     contactPhone: '+1 (111) 222-3333',
//     message: 'We are looking for a comprehensive HRMS to streamline our growing team.',
//     requestDate: '2025-06-10',
//     status: 'Pending', // Pending, Approved, Rejected
//   },
//   {
//     id: 2,
//     companyName: 'Green Foods Co.',
//     industry: 'Food & Beverage',
//     employees: '200-500',
//     contactPerson: 'Mark Davis',
//     contactEmail: 'mark.d@greenfoods.com',
//     contactPhone: '+1 (444) 555-6666',
//     message: 'Need a system to manage payroll and employee records efficiently.',
//     requestDate: '2025-06-08',
//     status: 'Pending',
//   },
//   {
//     id: 3,
//     companyName: 'City Construction Ltd.',
//     industry: 'Construction',
//     employees: '500+',
//     contactPerson: 'Fatima Ali',
//     contactEmail: 'fatima.a@citycon.com',
//     contactPhone: '+92 (300) 123-4567',
//     message: 'Interested in a demo for your HRMS features.',
//     requestDate: '2025-06-05',
//     status: 'Pending',
//   },
// ];

// const Requests = () => {
//   const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'addCompany'
//   const [requests, setRequests] = useState(initialRequests); // State to manage requests
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('All');

//   // State for Add New Company Form
//   const [newCompany, setNewCompany] = useState({
//     companyName: '',
//     industry: '',
//     employees: '',
//     contactPerson: '',
//     contactEmail: '',
//     contactPhone: '',
//     address: '',
//     registrationDate: '', // Admin will input this
//     owner: '', // Admin will input this
//     logo: '', // Admin can provide a logo URL
//   });

//   // Helper function for action buttons
//   const renderActionButton = (icon, onClick, tooltip, type = 'default', disabled = false) => {
//     let colorClasses = 'text-gray-600 hover:bg-gray-100';
//     if (type === 'danger') {
//       colorClasses = 'text-red-600 hover:bg-red-50';
//     } else if (type === 'success') {
//       colorClasses = 'text-green-600 hover:bg-green-50';
//     } else if (type === 'primary') { // For send invitation
//       colorClasses = 'text-blue-600 hover:bg-blue-50';
//     }

//     return (
//       <button
//         onClick={onClick}
//         disabled={disabled}
//         className={`p-2 rounded-full transition ${colorClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//         title={tooltip}
//       >
//         {icon}
//       </button>
//     );
//   };

//   // Filter and search logic for requests
//   const filteredRequests = useMemo(() => {
//     return requests.filter(request => {
//       const matchesSearch = request.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                             request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                             request.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = filterStatus === 'All' || request.status === filterStatus;
//       return matchesSearch && matchesStatus;
//     });
//   }, [searchTerm, filterStatus, requests]);

//   // Request actions
//   const handleSendInvitation = (id) => {
//     setRequests(prevRequests =>
//       prevRequests.map(req =>
//         req.id === id ? { ...req, status: 'Approved' } : req
//       )
//     );
//     alert('Invitation sent for this company!');
//     // In a real app: Trigger invitation email, create tenant account, etc.
//   };

//   const handleCancelRequest = (id) => {
//     if (window.confirm('Are you sure you want to cancel this request?')) {
//       setRequests(prevRequests =>
//         prevRequests.map(req =>
//           req.id === id ? { ...req, status: 'Rejected' } : req
//         )
//       );
//       alert('Request cancelled.');
//       // In a real app: Notify sender, move to rejected list
//     }
//   };

//   // Manual Add Company Form handlers
//   const handleNewCompanyChange = (e) => {
//     const { name, value } = e.target;
//     setNewCompany(prev => ({ ...prev, [name]: value }));
//   };

//   const handleManualAddCompany = (e) => {
//     e.preventDefault();
//     if (!newCompany.companyName || !newCompany.contactEmail || !newCompany.owner || !newCompany.industry) {
//       alert('Please fill in all required fields: Company Name, Contact Email, Owner, and Industry.');
//       return;
//     }

//     // Simulate adding to the main companies list (you'd typically send to API)
//     console.log('Manually adding company:', newCompany);
//     alert(`Company '${newCompany.companyName}' added successfully! (simulated)`);

//     // Clear form
//     setNewCompany({
//       companyName: '',
//       industry: '',
//       employees: '',
//       contactPerson: '',
//       contactEmail: '',
//       contactPhone: '',
//       address: '',
//       registrationDate: '',
//       owner: '',
//       logo: '',
//     });
//     setActiveTab('requests'); // Optionally switch back to requests tab after adding
//   };


//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-120px)]"> {/* Adjusted min-h for layout */}
//       {/* Page Title and Tabs */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-200">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
//           <FaBuilding className="inline-block mr-3 text-blue-600" />
//           Company Management
//         </h2>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setActiveTab('requests')}
//             className={`px-5 py-2 rounded-t-lg font-medium text-lg transition-colors duration-200 ${
//               activeTab === 'requests'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             <FaInbox className="inline-block mr-2" /> Requests
//           </button>
//           <button
//             onClick={() => setActiveTab('addCompany')}
//             className={`px-5 py-2 rounded-t-lg font-medium text-lg transition-colors duration-200 ${
//               activeTab === 'addCompany'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             <FaPlusCircle className="inline-block mr-2" /> Add New Company
//           </button>
//         </div>
//       </div>

//       {/* Requests Tab Content */}
//       {activeTab === 'requests' && (
//         <div>
//           <p className="text-gray-600 text-lg mb-6">
//             Review and manage incoming requests from companies interested in your HRMS.
//           </p>
//           {/* Filters and Search for Requests */}
//           <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
//             <div className="relative w-full sm:w-1/2">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search requests by company, contact..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />
//             </div>

//             <div className="relative w-full sm:w-1/4">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaFilter className="h-5 w-5 text-gray-400" />
//               </div>
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               >
//                 <option value="All">All Statuses</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Approved">Approved</option>
//                 <option value="Rejected">Rejected</option>
//               </select>
//             </div>
//           </div>

//           {/* Requests Table */}
//           <div className="overflow-x-auto bg-white rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Company Name
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Contact Person
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Industry
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Request Date
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredRequests.length > 0 ? (
//                   filteredRequests.map((request) => (
//                     <tr key={request.id}>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">{request.companyName}</div>
//                         <div className="text-xs text-gray-500">{request.contactEmail}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{request.contactPerson}</div>
//                         <div className="text-xs text-gray-500">{request.contactPhone}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{request.industry}</div>
//                         <div className="text-xs text-gray-500">{request.employees} employees</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {request.requestDate}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                           request.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
//                           'bg-red-100 text-red-800'
//                         }`}>
//                           {request.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <div className="flex justify-end space-x-2">
//                           {request.status === 'Pending' && (
//                             <>
//                               {renderActionButton(
//                                 <FaPaperPlane className="w-4 h-4" />,
//                                 () => handleSendInvitation(request.id),
//                                 "Send Invitation",
//                                 "primary"
//                               )}
//                               {renderActionButton(
//                                 <FaTimesCircle className="w-4 h-4" />,
//                                 () => handleCancelRequest(request.id),
//                                 "Cancel Request",
//                                 "danger"
//                               )}
//                             </>
//                           )}
//                           {(request.status === 'Approved' || request.status === 'Rejected') && (
//                               <span className="text-gray-500 text-xs italic">
//                                 {request.status === 'Approved' ? 'Invitation Sent' : 'Request Canceled'}
//                               </span>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-8 text-center text-gray-600">
//                       No requests found matching your criteria.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Add New Company Tab Content */}
//       {activeTab === 'addCompany' && (
//         <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-inner">
//           <p className="text-gray-600 text-lg mb-6 text-center">
//             Manually add a new company to your registered HRMS clients.
//           </p>
//           <form onSubmit={handleManualAddCompany} className="space-y-6">
//             <div>
//               <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
//                 Company Name <span className="text-red-500">*</span>
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaBuilding className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="companyName"
//                   id="companyName"
//                   value={newCompany.companyName}
//                   onChange={handleNewCompanyChange}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="e.g., Nexus Corp"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
//                 Owner/Primary Contact <span className="text-red-500">*</span>
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaUser className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="owner"
//                   id="owner"
//                   value={newCompany.owner}
//                   onChange={handleNewCompanyChange}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="e.g., John Smith"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
//                 Industry <span className="text-red-500">*</span>
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaBriefcase className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="industry"
//                   id="industry"
//                   value={newCompany.industry}
//                   onChange={handleNewCompanyChange}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="e.g., Technology, Manufacturing"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">
//                 Number of Employees (Range)
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaUser className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text" // Using text to allow ranges like "50-200"
//                   name="employees"
//                   id="employees"
//                   value={newCompany.employees}
//                   onChange={handleNewCompanyChange}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="e.g., 50-200, 1000+"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
//                   Contact Email <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaEnvelope className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     name="contactEmail"
//                     id="contactEmail"
//                     value={newCompany.contactEmail}
//                     onChange={handleNewCompanyChange}
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="name@company.com"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
//                   Contact Phone
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaPhone className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="tel"
//                     name="contactPhone"
//                     id="contactPhone"
//                     value={newCompany.contactPhone}
//                     onChange={handleNewCompanyChange}
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="+1 (555) 123-4567"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//                 Company Address
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="address"
//                   id="address"
//                   value={newCompany.address}
//                   onChange={handleNewCompanyChange}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="e.g., 123 Main St, City, Country"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700 mb-1">
//                 Registration Date
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaCalendarAlt className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="date"
//                   name="registrationDate"
//                   id="registrationDate"
//                   value={newCompany.registrationDate}
//                   onChange={handleNewCompanyChange}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
//                 Company Logo URL (Optional)
//               </label>
//               <input
//                 type="url"
//                 name="logo"
//                 id="logo"
//                 value={newCompany.logo}
//                 onChange={handleNewCompanyChange}
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 placeholder="e.g., https://example.com/logo.png"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-300"
//             >
//               <FaPlusCircle className="mr-2 -ml-1 h-5 w-5" />
//               Add Company
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Requests;

import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiMail, FiX, FiCheck, 
  FiPlus, FiRefreshCw, FiClock, FiUser, FiBriefcase 
} from 'react-icons/fi';
import InviteModal from './components/InviteModal';
import AddCompanyModal from './components/AddCompanyModal';

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('pending');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Sample data - replace with API calls
  const [requests, setRequests] = useState([
    {
      id: 1,
      companyName: 'EduSoft Solutions',
      contactPerson: 'Bilal Ahmed',
      email: 'bilal@edusoft.com',
      phone: '+92 300 1234567',
      employeeCount: '15-20',
      requestedOn: '2023-07-15',
      status: 'pending',
      message: 'Interested in your HRMS for our growing team'
    },
    {
      id: 2,
      companyName: 'BuildIt Constructions',
      contactPerson: 'Sara Khan',
      email: 'sara@buildit.com',
      phone: '+92 321 9876543',
      employeeCount: '50-100',
      requestedOn: '2023-07-12',
      status: 'pending',
      message: 'Need system for our construction workers'
    },
    {
      id: 3,
      companyName: 'FoodExpress',
      contactPerson: 'Ali Raza',
      email: 'ali@foodexpress.com',
      phone: '+92 345 6789012',
      employeeCount: '30-50',
      requestedOn: '2023-07-10',
      status: 'rejected',
      message: 'Looking for HR solution for our delivery staff'
    }
  ]);

  // Filter requests
  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || request.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  // Handle actions
  const handleApprove = (request) => {
    setSelectedRequest(request);
    setShowInviteModal(true);
  };

  const handleReject = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
  };

  const handleInvite = (inviteData) => {
    // API call to send invitation
    console.log('Sending invitation to:', selectedRequest.email, 'with data:', inviteData);
    setRequests(requests.map(req => 
      req.id === selectedRequest.id ? { ...req, status: 'invited' } : req
    ));
    setShowInviteModal(false);
  };

  const handleAddCompany = (companyData) => {
    // API call to add company manually
    console.log('Adding company:', companyData);
    setShowAddModal(false);
  };

  const refreshData = () => {
    // API call to refresh data
    console.log('Refreshing data...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Company Requests</h1>
          <p className="text-gray-600">Manage incoming requests and send invitations</p>
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested On
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                          <div className="text-sm font-medium text-gray-900">{request.companyName}</div>
                          <div className="text-sm text-gray-500">{request.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                          <FiUser className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm text-gray-900">{request.contactPerson}</div>
                          <div className="text-sm text-gray-500">{request.phone}</div>
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
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'invited' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {request.status === 'pending' && (
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
                          onClick={() => console.log('View details', request.id)}
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
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
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
  );
};

export default Requests;