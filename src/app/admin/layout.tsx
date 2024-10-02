"use client";

import { Inter } from "next/font/google";

import Container from "@/admin-components/container/Container";
import ToastProvider from "@/app/(providers)";

import "@/app/admin/(styles)/main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <Container>{children}</Container>
          </ToastProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
