// ownerRoutes.jsx
import OwnerDashboard from "@/pages/owner-dashboard/overview";
import Companies from "@/pages/owner-dashboard/companies/sub-pages/registerCompanies";
import Requests from "@/pages/owner-dashboard/companies/sub-pages/requests";
import ProtectedRoute from "@/auth/ProtectedRoute";

const values = {
  token: "ownerToken",
  redirect: "hrms-pro/owner/login"
};

export const ownerRoutes = [
  {
    path: "/hrms-pro/owner/dashboard",
    element: (
      <ProtectedRoute values={values}>
        <OwnerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/hrms-pro/owner/companies/registered",
    element: (
      <ProtectedRoute values={values}>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/hrms-pro/owner/companies/requests",
    element: (
      <ProtectedRoute values={values}>
        <Requests />
      </ProtectedRoute>
    ),
  },
];
