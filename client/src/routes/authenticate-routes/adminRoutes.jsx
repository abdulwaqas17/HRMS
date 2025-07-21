import CompanyDashboard from "@/pages/admin-dashboard/overview";

import ProtectedRoute from "@/auth/ProtectedRoute";
import CompanyUsers from "@/pages/admin-dashboard/company-users";
const values = {
  token: "adminToken",
  redirect: "admin/login",
};
export const adminRoutes = [
  {
    path: "/:companyName/admin/dashboard",
    element: (
      <ProtectedRoute values={values}>
        <CompanyDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute values={values}>
        <CompanyUsers />
      </ProtectedRoute>
    ),
  },
];
