"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { TPayload } from "@/helpers/tokenServices";

const Admin = () => {
  const [user, setUser] = useState<TPayload>({} as TPayload);

  const getDetails = async () => {
    const res = await axios.get("api/home");
    setUser(res.data.userData);
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (user.role !== "admin") {
    return <div>Unauthorized</div>;
  }

  return <div>Admin</div>;
};

export default Admin;
