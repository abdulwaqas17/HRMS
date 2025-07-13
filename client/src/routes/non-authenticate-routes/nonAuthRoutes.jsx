
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
} from "@/pages/auth/auth-provider";

export const nonAuthRoutes = [
  { path: "/", element: <Home /> },

  {
    path: "/owner-login",
    element: <AuthLayout left={<OwnerLoginImage />} right={<OwnerLoginForm />} />,
  },
  {
    path: "/admin-login",
    element: <AuthLayout left={<AdminLoginImage />} right={<AdminLoginForm />} />,
  },
  {
    path: "/hr-login",
    element: <AuthLayout left={<HrLoginImage />} right={<HrLoginForm />} />,
  },
  {
    path: "/otp-verify",
    element: <AuthLayout left={<OtpVerifyImage />} right={<OtpVerifyForm />} />,
  },
  {
    path: "/forgot-password",
    element: <AuthLayout left={<ForgotPasswordImage />} right={<ForgotPasswordForm />} />,
  },
  { path: "/not-found", element: <NotFoundPage /> },
  { path: "*", element: <NotFoundPage /> },
];
