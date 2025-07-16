// ownerRoutes.jsx
import OwnerDashboard from "@/pages/owner-dashboard/overview";
import Companies from "@/pages/owner-dashboard/companies/sub-pages/registerCompanies";
import Requests from "@/pages/owner-dashboard/companies/sub-pages/requests";
import ProtectedRoute from "@/auth/ProtectedRoute";

const values = {
  token: "ownerToken",
  redirect: "owner/login"
};

export const ownerRoutes = [
  {
    path: "/owner/dashboard",
    element: (
      <ProtectedRoute values={values}>
        <OwnerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/owner/companies/registered",
    element: (
      <ProtectedRoute values={values}>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/owner/companies/requests",
    element: (
      <ProtectedRoute values={values}>
        <Requests />
      </ProtectedRoute>
    ),
  },
];
