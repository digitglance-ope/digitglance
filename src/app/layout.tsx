import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigitGlance | Accounting Intelligence. Built for Business.",
  description: "DigitGlance builds web applications, AI tools, and automation systems for accountants and business owners in Nigeria and beyond. Accounting services, tax advisory, Excel VBA tools, and SaaS products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}