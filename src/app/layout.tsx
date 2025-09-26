// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script"; // Import Script component

export const metadata: Metadata = {
  title: "Sewa Sepeda",
  description: "Aplikasi sewa sepeda",
};

// Dapatkan Client Key dari environment variable
const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Tambahkan script Snap.js di sini */}
        <Script
          type="text/javascript"
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={midtransClientKey}
          strategy="beforeInteractive" // Load script sebelum page interaktif
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
