"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import Register from "@/admin-components/auth/Register";

const RegisterPage = () => {
  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <Register />;
};

export default RegisterPage;
