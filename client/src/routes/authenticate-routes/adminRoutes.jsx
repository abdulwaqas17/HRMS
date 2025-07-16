import CompanyDashboard from "@/pages/admin-dashboard/overview";
import Hrs from "@/pages/admin-dashboard/hrs";
import ProtectedRoute from "@/auth/ProtectedRoute";
const values = {
  token: "adminToken",
  redirect: "admin/login",
};
export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute values={values}>
        <CompanyDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/hrs",
    element: (
      <ProtectedRoute values={values}>
        <Hrs />
      </ProtectedRoute>
    ),
  },
];
