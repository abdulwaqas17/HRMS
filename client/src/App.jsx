import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout";
import {
  ForgotPasswordForm,
  ForgotPasswordImage,
  LoginForm,
  LoginImage,
  OtpVerifyForm,
  OtpVerifyImage,
  SignupForm,
  SignupImage,
} from "./pages/auth";
import Home from "./pages/NonAuthenticatePages/HomePage/Home";
import DashboardLayout from "./pages/AuthenticatePages/ServiceProviderDashboard/DashboardLayout";
import Overview from "./components/ServiceProviderDashboard/overview";
import CompanyDashboard from "./pages/AuthenticatePages/CompanyDashboard/CompanyDashboard";
import CompOverview from "./components/CompanyDashboard/overview";
import HRs from "./components/CompanyDashboard/Hrs";
import NotFoundPage from "./pages/NotFoundPage ";
import RegisteredCompanies from "./components/ServiceProviderDashboard/companies/register/registeredCompanies/RegisteredCompanies";
import InviteRequests from "./components/ServiceProviderDashboard/companies/register/requets/Requets";


// import LoginForm from './pages/auth/Login'
// import { SignupForm } from './pages/auth'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home/>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout left={<SignupImage />} right={<SignupForm />} />
            }
          />
          <Route
            path="/login"
            element={<AuthLayout left={<LoginImage />} right={<LoginForm />} />}
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

            
              { /* Service Provider Dashboard Routes */}
           <Route path="/dashboard" element={<DashboardLayout ><Overview /></DashboardLayout>}/>
           <Route path="/dashboard/companies" element={<DashboardLayout ><RegisteredCompanies /></DashboardLayout>}/>
           <Route path="/dashboard/requets" element={<DashboardLayout ><InviteRequests /></DashboardLayout>}/>
           
          {/* <Route index element={<Overview />} /> */}
          {/* <Route path="companies" element={<Companies />} />
          <Route path="payments" element={<Payments />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="support" element={<SupportTickets />} />
          <Route path="settings" element={<Settings />} /> */}

           { /* Company Dashboard Routes */}
           <Route path="/company-dashboard" element={<CompanyDashboard><CompOverview/></CompanyDashboard>}/>
           <Route path="/company-dashboard/hrs" element={<CompanyDashboard><HRs/></CompanyDashboard>}/>

            <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
