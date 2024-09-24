import { Inter } from "next/font/google";
import { ReactNode } from "react";

import Container from "@/admin-components/container/Container";

import "./main.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body className={inter.className}>
        <Container>{children}</Container>
      </body>
    </html>
  );
};

export default RootLayout;
