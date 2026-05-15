import React, { useState } from "react";
import Input from "../components/Input";
import { Lock, Mail } from "lucide-react";
import FormBtn from "./FormBtn";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="bg-gray-950/70 w-full py-5  max-w-lg rounded-2xl">
      <h1 className="text-blue-400 text-3xl mb-5 font-bold text-center">
        Reset Your Password
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 "
      >
        <Input
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
          type="password"
          icon={Lock}
        />

        <Input
          value={confirmPassword}
          handleChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password..."
          type="password"
          icon={Lock}
        />

        <FormBtn text="Reset Password" isLoading={false} />
      </form>
    </div>
  );
};

export default ResetPasswordPage;
