import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import OtpPage from "./pages/OtpPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashBoard from "./pages/DashBoard";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<OtpPage />} />
          <Route path="/reset-password/:code" element={<ResetPasswordPage />} />
        </Routes>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
