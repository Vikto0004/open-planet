"use client";

import { useEffect, useState } from "react";

import AboutProject from "@/core/AboutProject/AboutProject";
import FAQ from "@/core/FAQ/FAQ";
import Loader from "@/core/Loader/Loader";

const Project = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <>
      <AboutProject />
      <FAQ />
    </>
  ) : (
    <Loader />
  );
};

export default Project;
