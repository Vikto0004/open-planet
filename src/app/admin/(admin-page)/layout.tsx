"use client";

import { ReactNode } from "react";

import Header from "@/admin-components/header/Header";
import Sidebar from "@/admin-components/sidebar/Sidebar";
import { useCheckAuth } from "@/admin-shared/hooks";
import css from "./layout.module.css";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const { isPending, isError } = useCheckAuth();

  if (isPending) {
    return (
      <>Loading...</>
    );
  }

  console.log(isPending);

  if (!isError) {
    return (
      <>
        <Header />
        <div className={css.wrapper}>
          <Sidebar />
          <div className={css.main}>{children}</div>
        </div>
      </>
    );
  }
};

export default RootLayout;