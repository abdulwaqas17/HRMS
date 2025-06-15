import DashboardLayout from '@/layouts/authenticate-pages/dashboard/layout';
import React from 'react';
import { 
  FiUsers, FiClock, FiCalendar, FiDollarSign, 
  FiAlertCircle, FiTrendingUp, FiTrendingDown 
} from 'react-icons/fi';
import AttendanceChart from './components/AttendanceChart';
import QuickActions from './components/QuickActions';
import LeaveBalanceTable from './components/LeaveBalanceTable';
import RecentHires from './components/RecentHires';
import UpcomingLeaves from './components/UpcomingLeaves';
import StatCard from './components/StatCard';


const HRDashboard = () => {
  // Sample data - replace with API calls
  const stats = [
    { 
      icon: <FiUsers size={20} />, 
      title: "Total Employees", 
      value: "142", 
      change: "+5%", 
      trend: "up" 
    },
    { 
      icon: <FiClock size={20} />, 
      title: "Today's Attendance", 
      value: "94%", 
      change: "+2%", 
      trend: "up" 
    },
    { 
      icon: <FiCalendar size={20} />, 
      title: "Pending Leaves", 
      value: "8", 
      change: "-3", 
      trend: "down" 
    },
    { 
      icon: <FiAlertCircle size={20} />, 
      title: "Disciplinary Cases", 
      value: "2", 
      change: "+1", 
      trend: "down" 
    },
  ];

  const attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    present: [95, 88, 96, 94, 80, 90],
    absent: [5, 12, 4, 6, 20, 10]
  };

  const leaveBalances = [
    { department: 'Development', casual: 42, annual: 85, sick: 23 },
    { department: 'Marketing', casual: 28, annual: 60, sick: 15 },
    { department: 'Operations', casual: 35, annual: 72, sick: 19 }
  ];

  const upcomingLeaves = [
    { name: 'Ali Khan', department: 'Development', type: 'Annual', days: 5, startDate: '2023-07-20' },
    { name: 'Sara Ahmed', department: 'Marketing', type: 'Casual', days: 2, startDate: '2023-07-22' },
    { name: 'Bilal Raza', department: 'Operations', type: 'Sick', days: 3, startDate: '2023-07-25' }
  ];

  const recentHires = [
    { name: 'Usman Ali', position: 'Frontend Developer', joinDate: '2023-07-10' },
    { name: 'Fatima Khan', position: 'HR Executive', joinDate: '2023-07-05' },
    { name: 'Ahmed Raza', position: 'Sales Manager', joinDate: '2023-06-28' }
  ];

  return (
    <DashboardLayout title="HR Manager" short="HR">
      {/* Stats Cards Row */}
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
            <h2 className="text-lg font-semibold text-gray-800">Monthly Attendance Trend</h2>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80">
            <AttendanceChart data={attendanceData} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <QuickActions />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Balances */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Department Leave Balances</h2>
          <LeaveBalanceTable data={leaveBalances} />
        </div>

        {/* Upcoming Leaves */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Upcoming Leaves</h2>
          <UpcomingLeaves data={upcomingLeaves} />
        </div>

        {/* Recent Hires */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Hires</h2>
          <RecentHires data={recentHires} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboard;