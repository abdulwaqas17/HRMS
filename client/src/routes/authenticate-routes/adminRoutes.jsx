import CompanyDashboard from "@/pages/admin-dashboard/overview";
import Hrs from "@/pages/admin-dashboard/hrs";

export const adminRoutes = [
  { path: "/admin/dashboard", element: <CompanyDashboard /> },
  { path: "/admin/hrs", element: <Hrs /> },
];
