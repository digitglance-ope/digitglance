import type { Metadata } from "next";
import Script from "next/script";
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