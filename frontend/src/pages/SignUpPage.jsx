import React, { useState } from "react";
import Input from "../components/Input";
import { Lock, Mail, User } from "lucide-react";
import FormBtn from "./FormBtn";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("clicked");
    const trimmedEmail = email?.trim().toLowerCase();
    const trimmedName = name?.trim().toLowerCase();
    if (!trimmedEmail || !trimmedName || !password)
      return toast.error("All fields are required");
    try {
      const { success } = await signUp(trimmedName, trimmedEmail, password);
      if (success)
        return navigate("/verify-email", { state: { email: trimmedEmail } });
    } catch (err) {
      console.log(err || "something went wrong");
    }
  }
  return (
    <div className="bg-gray-950/70 w-full py-5 max-w-lg rounded-2xl">
      <h1 className="text-blue-400 text-3xl mb-5 font-bold text-center">
        Create Account
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 "
      >
        <Input
          value={name}
          handleChange={(e) => setName(e.target.value)}
          placeholder="Full Name..."
          type="text"
          icon={User}
        />
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
        <FormBtn text="Sign Up" isLoading={isLoading} />
        {error && <div className="text-red-600 ">{error}</div>}
      </form>
      <Link to="/login" className="text-blue-500 text-center my-2 block">
        Already Have An Account? Login Now?
      </Link>
    </div>
  );
};

export default SignUpPage;
