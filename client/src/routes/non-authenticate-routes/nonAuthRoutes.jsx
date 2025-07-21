import CompanyWelcome from "@/layouts/authenticate-pages/company-welcome/CompanyWelcome";
import AuthLayout from "@/layouts/authenticate-pages/signin/layout";
import Home from "@/layouts/non-authenticate-page/home";
import NotFoundPage from "@/pages/404-page/NotFoundPage ";
import {
  AdminLoginForm,
  AdminLoginImage,
  ForgotPasswordForm,
  ForgotPasswordImage,
  HrLoginForm,
  HrLoginImage,
  OtpVerifyForm,
  OtpVerifyImage,
  OwnerLoginForm,
  OwnerLoginImage,
  EmployeeLoginForm,
  EmployeeLoginImage,
} from "@/pages/auth/auth-provider";

export const nonAuthRoutes = [
  { path: "/", element: <Home /> },

  {
    path: "/:companyName",
    element: <CompanyWelcome />, // Ya koi layout component
  },
  {
    path: "/:companyName/admin/login",
    element: (
      <AuthLayout left={<AdminLoginImage />} right={<AdminLoginForm />} />
    ),
  },
  {
    path: "/:companyName/hr/login",
    element: <AuthLayout left={<HrLoginImage />} right={<HrLoginForm />} />,
  },
  {
    path: "/:companyName/employee/login",
    element: (
      <AuthLayout left={<EmployeeLoginImage />} right={<EmployeeLoginForm />} />
    ),
  },

  {
    path: "/hrms-pro/owner/login",
    element: (
      <AuthLayout left={<OwnerLoginImage />} right={<OwnerLoginForm />} />
    ),
  },
  // {
  //   path: "admin/login",
  //   element: <AuthLayout left={<AdminLoginImage />} right={<AdminLoginForm />} />,
  // },
  // {
  //   path: "hr/login",
  //   element: <AuthLayout left={<HrLoginImage />} right={<HrLoginForm />} />,
  // },
  // {
  //   path: "employee/login",
  //   element: <AuthLayout left={<EmployeeLoginImage />} right={<EmployeeLoginForm />} />,
  // },
  {
    path: "/otp-verify",
    element: <AuthLayout left={<OtpVerifyImage />} right={<OtpVerifyForm />} />,
  },
  {
    path: "/forgot-password",
    element: (
      <AuthLayout
        left={<ForgotPasswordImage />}
        right={<ForgotPasswordForm />}
      />
    ),
  },

  { path: "/not-found", element: <NotFoundPage /> },
  { path: "*", element: <NotFoundPage /> },
];
