"use client"

import { ReactNode } from "react";
import { useCheckAuth } from "@/admin-shared/hooks";

const RootLayout = ({ children }: { children: ReactNode }) => {
  useCheckAuth();

  return (
    <>{children}</>
  );
};

export default RootLayout;
