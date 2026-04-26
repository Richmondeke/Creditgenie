import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Creditgenie | Premium Loan Management",
  description: "Internal tool for managing loan applications with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-[#f6f9fc] selection:bg-brand-purple/10 text-foreground">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 lg:pl-64 flex flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
