"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/admin-components/auth/Login";

const LoginPage = () => {
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

  return <Login />;
};

export default LoginPage;
