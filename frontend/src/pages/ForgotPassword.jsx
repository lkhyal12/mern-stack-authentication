import React, { useState } from "react";
import Input from "../components/Input";
import { ArrowBigLeft, ArrowLeft, Lock, Mail, User } from "lucide-react";
import FormBtn from "./FormBtn";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="bg-gray-950/70 w-full py-5  max-w-lg rounded-2xl">
      <h1 className="text-blue-400 text-3xl mb-5 font-bold text-center">
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

        <FormBtn text="Send Reset Link" isLoading={false} />
      </form>
      <Link
        to="/login"
        className="bg-gray-900/90  text-blue-500   mx-auto w-9/10 py-2 text-center text-lg font-bold rounded-lg flex items-center justify-center cursor-pointer outline-none border-none scale-100 active:scale-95 transition-transform duration-200 mt-2.5 gap-2"
      >
        <ArrowLeft /> <span>Back to Login</span>
      </Link>
    </div>
  );
};

export default ForgotPassword;
