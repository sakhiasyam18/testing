"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { mockSepeda, mockPaket } from "@/lib/data";

export default function KonfirmasiPage() {
  const searchParams = useSearchParams();

  // Ambil data dari URL
  const orderId = searchParams.get("orderId");
  const nama = searchParams.get("nama");
  const sepedaId = searchParams.get("sepedaId");
  const paketId = searchParams.get("paketId");

  const sepeda = mockSepeda.find((s) => s.id === sepedaId);
  const paket = mockPaket.find((p) => p.id === paketId);

  if (!orderId || !sepeda || !paket) {
    return (
      <div className="text-center text-red-500">
        <h2>Data Pesanan Tidak Ditemukan!</h2>
        <p>Silakan coba lagi dari halaman utama.</p>
        <Link href="/" className="text-blue-600">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
      <svg
        className="w-16 h-16 mx-auto text-green-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h2 className="text-2xl font-bold text-green-600 mb-2">
        Pembayaran Berhasil!
      </h2>
      <p className="text-gray-600 mb-6">
        Terima kasih, {nama}. Pesanan Anda telah kami konfirmasi.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg text-left space-y-2">
        <p>
          <strong>ID Pesanan:</strong> {orderId}
        </p>
        <p>
          <strong>Sepeda:</strong> {sepeda.nama}
        </p>
        <p>
          <strong>Paket:</strong> {paket.nama}
        </p>
        <p>
          <strong>Total:</strong> Rp {paket.harga.toLocaleString("id-ID")}
        </p>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block w-full bg-gray-700 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg"
      >
        Sewa Lagi
      </Link>
    </div>
  );
}
