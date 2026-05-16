import React from "react";
import { useAuthStore } from "../store/authStore";

const DashBoard = () => {
  const { user } = useAuthStore();
  console.log({ user });
  return <div className="text-white text-4xl">Home page</div>;
};

export default DashBoard;
