"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { TPayload } from "@/helpers/tokenServices";

const Admin = () => {
  const [details, setDetails] = useState<TPayload>({} as TPayload);
  const getDetails = async () => {
    const res = await axios.get("api/home");
    setDetails(res.data.userData);
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (details.role !== "admin") {
    return <div>Unauthorized</div>;
  }

  return <div>Admin</div>;
};

export default Admin;
