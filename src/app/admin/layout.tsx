import Container from "@/admin-components/container/Container";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

import "./styles/main.css";
import css from "./styles/layout.module.css";

import Header from "@/admin-components/header/Header";
import Sidebar from "@/admin-components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body className={inter.className}>
        <Container>
          <Header />
          <div className={css.wrapper}>
            <Sidebar />
            <div className={css.main}>{children}</div>
          </div>
        </Container>
      </body>
    </html>
  );
};

export default RootLayout;
