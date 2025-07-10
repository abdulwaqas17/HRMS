import React from 'react';
import { 
  FiUsers, FiDollarSign, FiCalendar, 
  FiClock, FiTrendingUp, FiAlertCircle 
} from 'react-icons/fi';


import DashboardLayout from '@/layouts/authenticate-pages/dashboard/layout';
import StatCard from './components/StatCard';
import BarChart from './components/BarChart';
import RecentActivity from './components/RecentActivity';
import EmployeeDistribution from './components/EmployeeDistribution';
import PieChart from './components/PieChart';

const CompanyDashboard = () => {
  // Sample data - replace with API calls
  const stats = [
    { icon: <FiUsers size={20} />, title: "Total Employees", value: "142", change: "+12%", trend: "up" },
    { icon: <FiClock size={20} />, title: "Attendance Today", value: "92%", change: "+2%", trend: "up" },
    { icon: <FiCalendar size={20} />, title: "Pending Leaves", value: "7", change: "-3", trend: "down" },
    { icon: <FiDollarSign size={20} />, title: "Payroll Due", value: "$28,450", change: "+8.2%", trend: "up" },
  ];

  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Present',
        data: [92, 95, 90, 94, 93, 50],
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Absent',
        data: [8, 5, 10, 6, 7, 50],
        backgroundColor: '#EF4444',
      }
    ]
  };

  const departmentDistribution = {
    labels: ['Development', 'Marketing', 'HR', 'Operations', 'Finance'],
    datasets: [
      {
        data: [35, 20, 15, 20, 10],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#6366F1',
          '#EC4899'
        ],
      }
    ]
  };

  const recentActivities = [
    { id: 1, action: 'New employee onboarded', person: 'Ali Ahmed', time: '2 hours ago' },
    { id: 2, action: 'Leave request approved', person: 'Sara Khan', time: '1 day ago' },
    { id: 3, action: 'Payroll processed', person: 'Finance Team', time: '2 days ago' },
  ];

  return (
    <DashboardLayout title="Company Admin" short="Ad">
   <div>
         <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Attendance Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Weekly Attendance</h2>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-80">
            <BarChart data={attendanceData} />
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Department Distribution</h2>
          <div className="h-64">
            <PieChart data={departmentDistribution} />
          </div>
          <div className="mt-4 space-y-2">
            {departmentDistribution.labels.map((label, i) => (
              <div key={i} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: departmentDistribution.datasets[0].backgroundColor[i] }}
                ></div>
                <span className="text-sm text-gray-600">{label}: {departmentDistribution.datasets[0].data[i]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <RecentActivity 
                key={activity.id}
                action={activity.action}
                person={activity.person}
                time={activity.time}
              />
            ))}
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Activity →
          </button>
        </div>

        {/* Employee Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Employee Status</h2>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Departments</option>
              <option>Development</option>
              <option>Marketing</option>
            </select>
          </div>
          <EmployeeDistribution />
        </div>
      </div>
   </div>
    </DashboardLayout>
  );
};

export default CompanyDashboard;