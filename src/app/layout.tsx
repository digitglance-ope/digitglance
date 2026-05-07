import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "DigitGlance | Accounting Intelligence. Built for Business.",
  description: "DigitGlance builds web applications, AI tools, and automation systems for accountants and business owners in Nigeria and beyond. Accounting services, tax advisory, Excel VBA tools, and SaaS products.",
  verification: {
    google: 'uOC-JGZYuNn9uxE77fF4IYrk7806RaXMpnjccR7URuo',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0FYSGTYP6G"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0FYSGTYP6G');
          `}
        </Script>
      </body>
    </html>
  );
}