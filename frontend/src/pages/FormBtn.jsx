import React from "react";

const FormBtn = ({ text, isLoading }) => {
  function handleClick(e) {}
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white w-9/10 py-2 text-center text-lg font-bold rounded-lg cursor-pointer outline-none border-none scale-100 active:scale-95 transition-transform duration-200"
    >
      {text}
    </button>
  );
};

export default FormBtn;
