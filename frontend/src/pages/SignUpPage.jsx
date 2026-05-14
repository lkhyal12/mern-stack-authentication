import React, { useState } from "react";
import Input from "../components/Input";
import { Lock, Mail, User } from "lucide-react";
import FormBtn from "./FormBtn";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log({ password });
  function handleSubmit(e) {
    e.preventDefault();
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
        <FormBtn text="Sign Up" isLoading={false} />
      </form>
      <Link to="/login" className="text-blue-500 text-center my-2 block">
        Already Have An Account? Login Now?
      </Link>
    </div>
  );
};

export default SignUpPage;
