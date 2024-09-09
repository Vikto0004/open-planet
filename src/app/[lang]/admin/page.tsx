"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { TPayload } from "@/helpers/tokenServices";

const Admin = () => {
  const [user, setUser] = useState<TPayload>({} as TPayload);

  const getDetails = async () => {
    const res = await axios.get("api/");

    setUser(res.data.userData);
  };

  console.log(user);

  useEffect(() => {
    getDetails();
  }, []);

  if (user?.role !== "admin") {
    return <div>Unauthorized</div>;
  }

  return <div>Admin {user.email}</div>;
};

export default Admin;
