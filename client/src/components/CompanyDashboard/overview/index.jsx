import AttendanceChart from "./attendanceChart/AttendanceChart";
import LeaveRequests from "./leaveRequests/LeaveRequests";
import Notifications from "./notifications/Notifications";
import PayrollSummary from "./payrollSummary/PayrollSummary";
import StatsCards from "./statsCards/StatsCards";

const CompOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Dashboard Overview
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's what's happening with your company today.
        </p>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
        <div>
          <Notifications />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LeaveRequests />
        <PayrollSummary />
      </div>
    </div>
  );
};

export default CompOverview;