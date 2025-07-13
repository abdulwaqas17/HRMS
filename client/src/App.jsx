// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Import all route arrays
import { nonAuthRoutes } from "./routes/non-authenticate-routes/nonAuthRoutes.jsx";
import { ownerRoutes } from "./routes/authenticate-routes/ownerRoutes.jsx";
import { adminRoutes } from "./routes/authenticate-routes/adminRoutes.jsx";
import { hrRoutes } from "./routes/authenticate-routes/hrRoutes.jsx";
import { registerRoutes } from "./routes/authenticate-routes/registerRoutes.jsx";
// App.jsx
// import { nonAuthRoutes } from "@/routes/non-authenticate-routes/nonAuthRoutes.jsx";
// import { ownerRoutes } from "@/routes/authenticate-routes/ownerRoutes.jsx";
// import { adminRoutes } from "@/routes/authenticate-routes/adminRoutes.jsx";
// import { hrRoutes } from "@/routes/authenticate-routes/hrRoutes.jsx";
// import { registerRoutes } from "@/routes/authenticate-routes/registerRoutes.jsx";


function App() {
  const allRoutes = [
    ...nonAuthRoutes,
    ...ownerRoutes,
    ...adminRoutes,
    ...hrRoutes,
    ...registerRoutes,
  ];

  return (
    <BrowserRouter>
      <Routes>
        {allRoutes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </BrowserRouter>
  );
}

export default App;























// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Toaster } from 'react-hot-toast';
// import AuthLayout from "./layouts/authenticate-pages/signin/layout";
// import {
//   AdminLoginForm,
//   AdminLoginImage,
//   ForgotPasswordForm,
//   ForgotPasswordImage,
//   HrLoginForm,
//   HrLoginImage,
//   OtpVerifyForm,
//   OtpVerifyImage,
//   OwnerLoginForm,
//   OwnerLoginImage,
// } from "./pages/auth/auth-provider";
// import NotFoundPage from "./pages/404-page/NotFoundPage ";
// import Companies from "./pages/owner-dashboard/companies/sub-pages/registerCompanies";
// import Requests from "./pages/owner-dashboard/companies/sub-pages/requests";
// import Home from "./layouts/non-authenticate-page/home";
// import OwnerDashboard from "./pages/owner-dashboard/overview";
// import CompanyDashboard from "./pages/admin-dashboard/overview";
// import HRDashboard from "./pages/hr-dashboard/overview";
// import CompanyRegister from "./pages/register-pages/CompanyRegister";
// import AdminRegister from "./pages/register-pages/AdminRegister";
// import Hrs from "./pages/admin-dashboard/hrs";

// // import LoginForm from './pages/auth/Login'
// // import { SignupForm } from './pages/auth'

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route
//             path="/owner-login"
//             element={
//               <AuthLayout left={<OwnerLoginImage />} right={<OwnerLoginForm />} />
//             }
//           />
//           <Route
//             path="/admin-login"
//             element={
//               <AuthLayout
//                 left={<AdminLoginImage />}
//                 right={<AdminLoginForm />}
//               />
//             }
//           />
//           <Route
//             path="/hr-login"
//             element={
//               <AuthLayout left={<HrLoginImage />} right={<HrLoginForm />} />
//             }
//           />
//           <Route
//             path="/otp-verify"
//             element={
//               <AuthLayout left={<OtpVerifyImage />} right={<OtpVerifyForm />} />
//             }
//           />
//           <Route
//             path="forgot-password"
//             element={
//               <AuthLayout
//                 left={<ForgotPasswordImage />}
//                 right={<ForgotPasswordForm />}
//               />
//             }
//           />

//           {/* Service Provider Dashboard Routes */}
//           <Route path="owner/dashboard" element={<OwnerDashboard />} />
//           <Route path="owner/companies/registered" element={<Companies />} />
//           <Route path="owner/companies/requests" element={<Requests />} />


//           {/* Company Dashboard Routes */}
//           <Route path="/admin/dashboard" element={<CompanyDashboard />} />
//           <Route path="/admin/hrs" element={<Hrs />} />

//           {/* HR Dashboard Routes */}

//           <Route path="/hr/dashboard" element={<HRDashboard />} />

//           {/* <Route index element={<Overview />} /> */}
//           {/* <Route path="companies" element={<Companies />} />
//           <Route path="payments" element={<Payments />} />
//           <Route path="subscriptions" element={<Subscriptions />} />
//           <Route path="support" element={<SupportTickets />} />
//           <Route path="settings" element={<Settings />} /> */}

//           {/* Company Dashboard Routes */}
//           {/* <Route path="/company-dashboard" element={<CompanyDashboard><CompOverview/></CompanyDashboard>}/>
//            <Route path="/company-dashboard/hrs" element={<CompanyDashboard><HRs/></CompanyDashboard>}/> */}

//           <Route path="/company-register/:id" element={<CompanyRegister />} />
//           <Route path="/admin-register/:id" element={<AdminRegister />} />
//           <Route path="/not-found" element={<NotFoundPage />} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//              <Toaster
//         position="top-center"
//         toastOptions={{
//           duration: 2000
         
//         }}
//       />
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
