import React, { ChangeEvent, FC, useState } from "react";

type TInput = {
  placeholder: string;
  name: string;
  value: string;
  error?: string;
  type?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const AuthInput: FC<TInput> = ({
  placeholder,
  onChange,
  name,
  value,
  error,
  type = "text",
}) => {
  const [isFocused, setIsFocused] = useState("");

  const isError = isFocused === name && error;
  return (
    <div
      className={`relative  m-2 flex flex-col rounded-md  border-2 border-solid bg-white px-2 py-1 text-black ${
        isError ? "border-red-500" : "border-gray-500"
      } w-80 `}
    >
      {isError && (
        <span className="absolute left-2 top-[-18px] w-full text-xs text-red-500 ">
          {error}
        </span>
      )}
      <input
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full bg-transparent hover:outline-none focus:outline-none`}
        value={value}
        type={type}
        onBlur={() => setIsFocused(name)}
      />
    </div>
  );
};

export default AuthInput;
