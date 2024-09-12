"use client";
import { TPayload } from "@/services/tokenServices";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Admin = () => {
  const [user, setUser] = useState<TPayload | null>(null);
  const router = useRouter();

  const getDetails = async () => {
    try {
      const res = await axios.get("api/");
      setUser(res.data.userData);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (user === null || user?.role !== "admin") {
      router.push("/admin/login");
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <div>Admin {user.email}</div>;
};

export default Admin;
