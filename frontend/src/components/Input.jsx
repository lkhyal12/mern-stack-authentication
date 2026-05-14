import React, { useRef } from "react";

const Input = ({ icon: Icon, value, handleChange, type, placeholder }) => {
  const containerRef = useRef();
  function handleFocus() {
    containerRef.current?.classList.add("focus");
  }
  function handleBlur() {
    containerRef.current?.classList.remove("focus");
  }
  return (
    <div
      ref={containerRef}
      className="relative bg-gray-800/80 flex items-center justify-center rounded-lg  w-9/10 p-1 gap-1"
    >
      <Icon className=" text-blue-500 w-5 h-5" />
      <input
        onFocus={handleFocus}
        type={type}
        placeholder={placeholder}
        className="border-gray-400 outline-none p-1 text-lg text-white  rounded-lg flex-1"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Input;
