import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import FormBtn from "./FormBtn";
const DashBoard = () => {
  const { user, isCheckingAuth, getUser, logout } = useAuthStore();
  const [loadin, setLoading] = useState(true);
  const [isLoginOut, setIsLoginOut] = useState(false);
  const navigate = useNavigate();
  console.log({ user });
  // async function getUserFun() {
  //   const { success } = await getUser();
  // }
  async function handleLogout() {
    setIsLoginOut(true);
    const { success } = await logout();
    if (success) return navigate("/login");
    setIsLoginOut(false);
  }

  useEffect(() => {
    async function getUserFun() {
      setLoading(true);
      await getUser();
      setLoading(false);
    }
    getUserFun();
  }, []);

  if (loadin)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader className="size-8 md:size-10 lg:size-12 animate-spin duration-200" />
      </div>
    );

  if (!isCheckingAuth && !user) return <Navigate to="/login" />;
  return (
    <div className="bg-gray-950/70 w-full py-5  max-w-lg rounded-2xl">
      <h1 className="text-blue-400 text-3xl mb-5 font-bold text-center">
        Dashboard
      </h1>
      <div className="bg-gray-900/60 w-9/10 md:w-8/10 rounded-lg border border-white/50 py-4 px-3 mx-auto">
        <h1 className="text-blue-400 text-xl mb-5 font-medium">Profile Info</h1>
        <div>
          <h3 className="text-white/80 text-lg font-bold">
            Name: <span className="text-base font-medium">{user.name}</span>
          </h3>
          <h3 className="text-white/80 text-lg font-bold">
            Email: <span className="text-base font-medium">{user.email}</span>
          </h3>
          <h3 className="text-white/80 text-lg font-bold">
            Verified:{" "}
            <span className="text-base font-medium">
              {user.verified ? "True" : "False"}
            </span>
          </h3>
        </div>
        <div className="mt-5">
          <button
            disabled={isLoginOut}
            onClick={handleLogout}
            className="bg-blue-500 text-white w-full py-2 text-center text-lg font-bold rounded-lg cursor-pointer outline-none border-none scale-100 active:scale-95 transition-transform duration-200 flex items-center justify-center disabled:pointer-events-none disabled:opacity-70"
          >
            {isLoginOut ? (
              <Loader className="animate-spin duration-200" />
            ) : (
              "Log Out"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
