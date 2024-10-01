"use client";

import React from "react";
import { useCheckAuthRegister } from "@/app/admin/hooks";
import Register from "@/admin-components/auth/Register";

const RegisterPage = () => {
  useCheckAuthRegister();

  return <Register />;
};

export default RegisterPage;
