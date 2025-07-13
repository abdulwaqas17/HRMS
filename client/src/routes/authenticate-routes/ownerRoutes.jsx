import OwnerDashboard from "@/pages/owner-dashboard/overview";
import Companies from "@/pages/owner-dashboard/companies/sub-pages/registerCompanies";
import Requests from "@/pages/owner-dashboard/companies/sub-pages/requests";

export const ownerRoutes = [
  { path: "/owner/dashboard", element: <OwnerDashboard /> },
  { path: "/owner/companies/registered", element: <Companies /> },
  { path: "/owner/companies/requests", element: <Requests /> },
];
