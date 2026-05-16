import React, { useState } from "react";
import Input from "../components/Input";
import { ArrowBigLeft, ArrowLeft, Lock, Mail, User } from "lucide-react";
import FormBtn from "./FormBtn";
import { Link } from "react-router-dom";
import SentForgotPasswordContainer from "../components/SentForgotPasswordContainer";
import { useAuthStore } from "../store/authStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);
  const { forgotPassword, isLoading, error } = useAuthStore();
  async function handleSubmit(e) {
    e.preventDefault();
    const { success } = await forgotPassword(email);
    if (success) setIsResetLinkSent(true);
  }
  return (
    <>
      {isResetLinkSent ? (
        <SentForgotPasswordContainer />
      ) : (
        <>
          <div className="bg-gray-950/70 w-full py-5   max-w-lg rounded-2xl">
            <h1 className="text-blue-600 text-3xl mb-5 font-bold text-center">
              Forgot Password
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 "
            >
              <Input
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address..."
                type="email"
                icon={Mail}
              />

              <FormBtn text="Send Reset Link" isLoading={isLoading} />
            </form>
            <Link
              to="/login"
              className="bg-gray-900/90  text-blue-500   mx-auto w-9/10 py-2 text-center text-lg font-bold rounded-lg flex items-center justify-center cursor-pointer outline-none border-none scale-100 active:scale-95 transition-transform duration-200 mt-2.5 gap-2"
            >
              <ArrowLeft /> <span>Back to Login</span>
            </Link>
            {error && (
              <div className="text-center text-red-500 mt-2">{error}</div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
