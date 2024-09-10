import Container from "@/admin-components/container/Container";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="uk">
      <body>
        <Container>{children}</Container>
      </body>
    </html>
  );
};

export default RootLayout;
