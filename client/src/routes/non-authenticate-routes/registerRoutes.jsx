import CompanyRegister from "@/pages/register-pages/CompanyRegister";
import AdminRegister from "@/pages/register-pages/AdminRegister";

export const registerRoutes = [
  { path: "/company-register/:id", element: <CompanyRegister /> },
  { path: "/admin-register/:id", element: <AdminRegister /> },
];
