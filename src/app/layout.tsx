// 'use client'
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/AuthSessionProvider";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children,}:  Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>TODOMASTER</title>
        <link rel="icon" href="/images/favicon.ico" /> 
      </head>
      <body className={inter.className}>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
