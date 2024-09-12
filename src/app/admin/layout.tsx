import Container from "@/admin-components/container/Container";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

import "./main.css";
import Header from "@/admin-components/header/Header";
import Sidebar from "@/admin-components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body className={inter.className}>
        <Container>
          <Header />
          <div className="wrapper">
            <Sidebar />
            {children}
          </div>
        </Container>
      </body>
    </html>
  );
};

export default RootLayout;
