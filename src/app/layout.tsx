// src/app/layout.tsx
import type { Metadata } from "next";
// import React from "react";
import "./globals.css"; // Pastikan ini mengimpor file CSS global kita

export const metadata: Metadata = {
  title: "Persewaan Sepeda Online di Malang", // Judul SEO kita
  description:
    "Sistem Online Persewaan dan Manajemen Sepeda Mitra Gowes Lur Malang untuk Mendukung Kesehatan, Kesejahteraan, serta Energi Bersih dan Terjangkau (SDGs 3&7)", // Deskripsi SEO kita
  // icons: {
  //   icon: "/logo-goweslurmalang.ico",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {/* Global UI elements like Header, Footer, Navigation */}
        <main>{children}</main>
      </body>
    </html>
  );
}
