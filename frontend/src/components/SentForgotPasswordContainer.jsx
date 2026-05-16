import React from "react";
import FormBtn from "../pages/FormBtn";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SentForgotPasswordContainer = () => {
  return (
    <div className="relative bg-gray-800/80 flex flex-col items-center justify-center rounded-lg  w-9/10 max-w-lg px-1 gap-1 py-5">
      <div className="text-lg text-blue-500 max-w-8/10 text-center">
        If an account with this email exists, a password reset link has been
        sent to your inbox.
      </div>
      <Link
        to="/login"
        className="bg-gray-900/90  text-blue-500   mx-auto w-9/10 py-2 text-center text-lg font-bold rounded-lg flex items-center justify-center cursor-pointer outline-none border-none scale-100 active:scale-95 transition-transform duration-200 mt-2.5 gap-2"
      >
        <ArrowLeft /> <span>Back to Login Page</span>
      </Link>
    </div>
  );
};

export default SentForgotPasswordContainer;
