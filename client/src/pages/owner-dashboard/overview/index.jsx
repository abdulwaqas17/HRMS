import React from 'react';
import { 
  FiDollarSign, FiBriefcase, FiClock, FiUserCheck 
} from 'react-icons/fi';
import CompaniesChart from './components/CompaniesChart';
import RecentCompanies from './components/RecentCompanies';
import PaymentSummary from './components/PaymentSummary';
import DashboardLayout from '@/layouts/authenticate-pages/dashboard/layout';

const OwnerDashboard = () => {
  const stats = [
    { icon: <FiBriefcase />, title: "Total Companies", value: "142", change: "+12%", trend: "up" },
    { icon: <FiDollarSign />, title: "Revenue", value: "$28,450", change: "+8.2%", trend: "up" },
    { icon: <FiUserCheck />, title: "Active Subscriptions", value: "118", change: "+5%", trend: "up" },
    { icon: <FiClock />, title: "Pending Tickets", value: "7", change: "-2", trend: "down" },
  ];

  return (
    <DashboardLayout title="Service Provider" short="SP">
      <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm mt-4">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Company Registrations</h2>
            <CompaniesChart />
          </div>
        </div>
        
        <div className="space-y-6">
          <RecentCompanies />
          <PaymentSummary />
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default OwnerDashboard;