import React, { useRef, useState } from "react";
import FormBtn from "./FormBtn";

const OtpPage = () => {
  const [code, setCode] = useState(["5", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  async function handleSubmit(e) {}
  return (
    <div className="bg-gray-950/70 w-9/10 py-5  max-w-lg rounded-2xl">
      <h1 className="text-blue-400 text-3xl mb-5 font-bold text-center">
        Verify Your Email
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 "
      >
        <div className="flex items-center gap-3">
          {code.map((digit, index) => (
            <input
              className="size-10 md:size-15 text-center bg-gray-800/50 text-white text-3xl md:text-4xl font-bold rounded-lg"
              type="string"
              ref={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </div>
        <FormBtn text={"Verify Email"} isLoading={false} />
      </form>
    </div>
  );
};

export default OtpPage;
