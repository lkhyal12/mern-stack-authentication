import React from "react";
import { useAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";

const DashBoard = () => {
  const { user, isCheckingAuth, getUser } = useAuthStore();

  console.log({ user });
  async function getUserFun() {
    const { success } = await getUser();
  }

  if (isCheckingAuth)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader className="size-8 md:size-10 lg:size-12 animate-spin duration-200" />
      </div>
    );
  return (
    <div className="">
      <h1 className="text-white text-4xl">Home Page</h1>
      <button
        onClick={getUserFun}
        className="text-white bg-blue-500 px-5 py-1 cursor-pointer font-bold"
      >
        get user
      </button>
    </div>
  );
};

export default DashBoard;
