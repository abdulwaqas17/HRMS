import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/authenticate-pages/signin/layout";
import {
  AdminLoginForm,
  AdminLoginImage,
  ForgotPasswordForm,
  ForgotPasswordImage,
  HrLoginForm,
  HrLoginImage,
  OtpVerifyForm,
  OtpVerifyImage,
  SPLoginForm,
  SPLoginImage,
} from "./pages/auth/auth-provider";
import NotFoundPage from "./pages/404-page/NotFoundPage ";
import Companies from "./pages/sp-dashboard/companies/sub-pages/registerCompanies";
import Requests from "./pages/sp-dashboard/companies/sub-pages/requests";
import Home from "./layouts/non-authenticate-page/home";
import SPDashboard from "./pages/sp-dashboard/overview";
import CompanyDashboard from "./pages/company-dashboard/overview";
import HRDashboard from "./pages/hr-dashboard/overview";

// import LoginForm from './pages/auth/Login'
// import { SignupForm } from './pages/auth'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/sp-login"
            element={
              <AuthLayout left={<SPLoginImage />} right={<SPLoginForm />} />
            }
          />
          <Route
            path="/admin-login"
            element={
              <AuthLayout
                left={<AdminLoginImage />}
                right={<AdminLoginForm />}
              />
            }
          />
          <Route
            path="/hr-login"
            element={
              <AuthLayout left={<HrLoginImage />} right={<HrLoginForm />} />
            }
          />
          <Route
            path="/otp-verify"
            element={
              <AuthLayout left={<OtpVerifyImage />} right={<OtpVerifyForm />} />
            }
          />
          <Route
            path="forgot-password"
            element={
              <AuthLayout
                left={<ForgotPasswordImage />}
                right={<ForgotPasswordForm />}
              />
            }
          />

          {/* Service Provider Dashboard Routes */}
          <Route path="sp/dashboard" element={<SPDashboard />} />
          <Route path="sp/companies/registered" element={<Companies />} />
          <Route path="sp/companies/requests" element={<Requests />} />

          {/* Company Dashboard Routes */}

          <Route path="/company/dashboard" element={<CompanyDashboard />} />

          {/* HR Dashboard Routes */}

          <Route path="/hr/dashboard" element={<HRDashboard />} />

          {/* <Route index element={<Overview />} /> */}
          {/* <Route path="companies" element={<Companies />} />
          <Route path="payments" element={<Payments />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="support" element={<SupportTickets />} />
          <Route path="settings" element={<Settings />} /> */}

          {/* Company Dashboard Routes */}
          {/* <Route path="/company-dashboard" element={<CompanyDashboard><CompOverview/></CompanyDashboard>}/>
           <Route path="/company-dashboard/hrs" element={<CompanyDashboard><HRs/></CompanyDashboard>}/> */}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
