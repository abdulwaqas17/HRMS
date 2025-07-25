import AdminSidebar from '@/components/dashboard/sidebars/AdminSidebar ';
import HRSidebar from '@/components/dashboard/sidebars/HRSidebar';
import OwnerSidebar from '@/components/dashboard/sidebars/OwnerSidebar';
import { useCompany } from '@/context/CompanyContext';
import React, { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';


const DashboardLayout = ({ children, title,short }) => {
 
    const [companyData, setCompanyData] = useState(null);
    const {loading,error,company} = useCompany();

    useEffect(() => {
      if (company) {  
        setCompanyData(company.data);
      }
    }, [company]);

    console.log('companyData', companyData);
    
  
    console.log('loading,error,company', loading, error, company);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    // localStorage.setItem('role','admin');
    // let personRole = localStorage.getItem('role');
      const pathParts = window.location.pathname.split("/");
      const role = pathParts[2];

      console.log('role,',role);
      
    
  const renderSidebar = () => {
    switch(role) {
      case 'owner':
        return <OwnerSidebar isOpen={sidebarOpen} />;
      case 'admin':
        return <AdminSidebar isOpen={sidebarOpen} />;
      case 'hr':
        return <HRSidebar isOpen={sidebarOpen} />;
      default:
        return null;
    }
  };

  if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <ClipLoader color="#2563eb" size={40} />
       </div>
     );
   }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Dynamic Sidebar */}
      {renderSidebar()}
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              {/* Notification and profile */}
             <div className="relative">
                 <button className="text-gray-500 hover:text-gray-600 focus:outline-none">
                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                   </svg>
                 </button>
                 <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
               </div>
              
               <div className="flex items-center">
                 <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                   {short}
                 </div>
                 <span className="ml-2 text-gray-700">{title}</span>
               </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;