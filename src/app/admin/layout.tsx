"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Roboto } from "next/font/google";

import ToastProvider from "@/app/(providers)";

import "@/app/admin/(styles)/main.css";

const inter = Roboto({ subsets: ["latin"], weight: "500" });

const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>{children}</ToastProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
