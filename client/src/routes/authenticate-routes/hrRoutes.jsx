import ProtectedRoute from "@/auth/ProtectedRoute";
import HRDashboard from "@/pages/hr-dashboard/overview";
const values = {
  token: "hrToken",
  redirect: "hr/login",
};

export const hrRoutes = [
  {
    path: "/hr/dashboard",
    element: (
      <ProtectedRoute values={values}>
        <HRDashboard />
      </ProtectedRoute>
    ),
  },
];
