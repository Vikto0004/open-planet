"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface IToastProviderProps {
  children: React.ReactNode;
}
export default function ToastProvider({ children }: IToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
