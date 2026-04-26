import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lydraflow | The operating system for loan automation.",
  description: "Transform your manual loan processes into an automated approval engine. Lydraflow provides the infrastructure for 4-tier approvals, KYB verification, and automated risk scoring—all in one premium platform.",
  openGraph: {
    images: ["/social-share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-white selection:bg-brand-purple/10 text-foreground overflow-x-hidden">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
