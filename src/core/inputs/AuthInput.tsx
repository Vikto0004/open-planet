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
    <div className={``}>
      {isError && <span className="">{error}</span>}
      <input
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={``}
        value={value}
        type={type}
        onBlur={() => setIsFocused(name)}
      />
    </div>
  );
};

export default AuthInput;
