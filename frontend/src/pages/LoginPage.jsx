import React, { useState } from "react";
import Input from "../components/Input";
import { Lock, Mail } from "lucide-react";
import FormBtn from "./FormBtn";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const trimmedEmail = email?.trim().toLocaleLowerCase();
    if (!trimmedEmail || !password)
      return toast.error("All fields are required");
    const { success, message } = await login(email, password);
    if (success) return navigate("/");
    else {
      console.log({ message });
      if (message === "Please check your inbox to  verify your account") {
        toast.error(message);
        return navigate("/verify-email", { state: { email: trimmedEmail } });
      }
    }
  }
  return (
    <div className="bg-gray-950/70 w-full py-5  max-w-lg rounded-2xl">
      <h1 className="text-blue-400 text-3xl mb-5 font-bold text-center">
        Login to your account
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 "
      >
        <Input
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
          type="email"
          icon={Mail}
        />
        <Input
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
          type="password"
          icon={Lock}
        />
        <FormBtn text="Log In" isLoading={isLoading} />
        {error && <div className="text-center text-red-500"> {error}</div>}
      </form>
      <Link to="/sign-up" className="text-blue-500 text-center my-2 block">
        Don't Have An Account? Sign Up Now?
      </Link>
      <Link
        to="/forgot-password"
        className="text-blue-500 text-center my-2 block underline"
      >
        Forgot Password?
      </Link>
    </div>
  );
};

export default LoginPage;
