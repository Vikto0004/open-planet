"use client";

import { Inter } from "next/font/google";
import { ReactNode } from "react";

import Container from "@/admin-components/container/Container";
import Header from "@/admin-components/header/Header";
import Sidebar from "@/admin-components/sidebar/Sidebar";
import ToastProvider from "@/app/(providers)";
import { useCheckAuth } from "@/app/admin/hooks";

import "../styles/main.css";
import css from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  const { checking, redirecting } = useCheckAuth();

  if (checking || redirecting) {
    return (
      <html>
        <body>
          <>Loading...</>
        </body>
      </html>
    );
  }

  return (
    <html>
      <body className={inter.className}>
        <ToastProvider>
          <Container>
            <Header />
            <div className={css.wrapper}>
              <Sidebar />
              <div className={css.main}>{children}</div>
            </div>
          </Container>
        </ToastProvider>
      </body>
    </html>
  );
};

export default RootLayout;
