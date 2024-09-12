"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
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

  return (
    <div>
      <Register />
    </div>
  );
};

export default RegisterPage;
