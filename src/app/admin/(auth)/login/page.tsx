"use client";
import React from "react";

import Login from "@/admin-components/auth/Login";
import { useCheckAuth } from "@/app/admin/hooks";

const LoginPage = () => {
  useCheckAuth();

  return <Login />;
};

export default LoginPage;
