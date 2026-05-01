import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

// Use a system font stack to avoid Google Fonts fetch issues during build
const fontStack = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-inter: ${fontStack};
          }
          body {
            font-family: var(--font-inter);
          }
        `}} />
      </head>
      <body className="antialiased bg-white selection:bg-brand-purple/10 text-foreground overflow-x-hidden">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
