"use client";

import { ReactNode } from "react";

import RootDashboardLayout from "@/admin-components/rootDashboardLayout/RootDashboardLayout";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <RootDashboardLayout>{children}</RootDashboardLayout>;
};
export default RootLayout;
