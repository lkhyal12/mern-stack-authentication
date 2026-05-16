import React, { useState } from "react";
import Input from "../components/Input";
import { Lock, Mail } from "lucide-react";
import FormBtn from "./FormBtn";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading, resetPassword, error } = useAuthStore();
  const { code } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password || !confirmPassword)
      return toast.error("All Fields are required");
    if (password !== confirmPassword)
      return toast.error("Password don not match");
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get("id");
    console.log({ id });
    const { success } = await resetPassword(password, code, id);
    if (success) {
      toast.success("Password reset successfully");
      return navigate("/login");
    }
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

        <FormBtn text="Reset Password" isLoading={isLoading} />
        {error && <div className="text-center text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
