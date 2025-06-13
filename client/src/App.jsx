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
import DashboardLayout from "./components/ServiceProviderDashboard/DashboardLayout";
import Overview from "./components/ServiceProviderDashboard/Overview";


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

           <Route path="/dashboard" element={<DashboardLayout ><Overview /></DashboardLayout>}>
          {/* <Route index element={<Overview />} /> */}
          {/* <Route path="companies" element={<Companies />} />
          <Route path="payments" element={<Payments />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="support" element={<SupportTickets />} />
          <Route path="settings" element={<Settings />} /> */}
        </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
