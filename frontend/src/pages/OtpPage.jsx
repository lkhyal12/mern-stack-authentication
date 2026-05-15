import React, { useEffect, useRef, useState } from "react";
import FormBtn from "./FormBtn";

const OtpPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  function handleChange(e, index) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (!value) return;

    const newCode = [...code];
    if (value.length === 1) {
      newCode[index] = value;
      inputsRef.current[index + 1]?.focus();
    } else {
      if (index !== code.length - 1) {
        const pastedValue = value
          .slice(0, code.length - index)
          .trim()
          .split("");
        pastedValue.forEach((el, i) => {
          newCode[i + index] = el;
        });
        const focusIndex = Math.min(
          code.length - 1,
          index + pastedValue.length,
        );
        inputsRef.current[focusIndex]?.focus();
      } else {
        newCode[index] = value.at(-1);
      }
    }
    setCode(newCode);
  }
  function handleKeyDown(e, index) {
    let newCode = [...code];
    if (e.key === "Backspace") {
      if (code[index]) {
        newCode[index] = "";
        setCode(newCode);
      } else {
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      }
    }
  }

  function handleClick(index) {
    inputsRef.current[index]?.setSelectionRange(1, 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("code", code);
  }

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);
  useEffect(() => {
    if (code.every(Boolean)) handleSubmit(new Event("submit"));
  }, [code]);
  return (
    <div className="bg-gray-950/70 w-9/10 py-5  max-w-lg rounded-2xl">
      <h1 className="text-blue-400 text-3xl mb-5 font-bold text-center">
        Verify Your Email
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 "
        autoComplete="off"
      >
        <div className="flex items-center gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              className="size-10 md:size-15 text-center bg-gray-800/50 text-white text-3xl focus:border-2 focus:border-blue-500 outline-none md:text-4xl font-bold rounded-lg "
              type="text"
              inputMode="numeric"
              autoComplete="new-password"
              spellCheck={false}
              ref={(el) => (inputsRef.current[index] = el)}
              value={digit}
              name={`no-autofill-${index}`}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <FormBtn text={"Verify Email"} isLoading={false} />
      </form>
    </div>
  );
};

export default OtpPage;
