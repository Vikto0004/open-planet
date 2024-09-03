import React, { FC, MouseEvent, ReactNode } from "react";

type TButton = {
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  // eslint-disable-next-line no-unused-vars
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const MainButton: FC<TButton> = ({
  children,
  type = "button",
  handleClick,
}) => {
  return (
    <button className="" type={type} onClick={handleClick}>
      {children}
    </button>
  );
};

export default MainButton;
