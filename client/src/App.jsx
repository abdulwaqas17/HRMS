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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
