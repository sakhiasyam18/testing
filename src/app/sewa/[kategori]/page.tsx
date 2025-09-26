"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { mockSepeda, mockPaket } from "@/lib/data"; // Impor data dari file terpusat

export default function SewaPage() {
  const params = useParams();
  const router = useRouter();

  // Mengambil kategori dari URL, contoh: 'premium' atau 'reguler'
  const kategori = params.kategori as string;

  const [formData, setFormData] = useState({
    nama: "",
    noTelepon: "",
    idSepeda: "",
    idPaket: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBayar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.idSepeda || !formData.idPaket) {
      alert("Silakan pilih sepeda dan paket terlebih dahulu.");
      return;
    }

    setIsLoading(true);

    // --- SIMULASI PEMBAYARAN ---
    // Di sini seharusnya ada logika pemanggilan API Midtrans Anda
    console.log("Memulai proses pembayaran untuk:", formData);

    // Simulasi proses backend dan Midtrans
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);

    // Setelah pembayaran berhasil, arahkan ke halaman konfirmasi
    // Kita lewatkan data via URL query parameters
    const query = new URLSearchParams({
      orderId: `ORD-${Date.now()}`,
      nama: formData.nama,
      sepedaId: formData.idSepeda,
      paketId: formData.idPaket,
    }).toString();

    router.push(`/konfirmasi?${query}`);
  };

  const sepedaTersedia = mockSepeda.filter(
    (s) => s.kategori === kategori && s.status === "Tersedia"
  );
  const paketTersedia = mockPaket.filter((p) => p.kategori === kategori);
  const paketTerpilih = mockPaket.find((p) => p.id === formData.idPaket);

  if (isLoading) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Memproses Pembayaran...</h2>
        <p>Mohon tunggu sebentar.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center capitalize">
        Formulir Sewa Sepeda {kategori}
      </h2>
      <form onSubmit={handleBayar}>
        {/* ... (Salin elemen-elemen form dari kode sebelumnya) ... */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="nama"
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            No. WhatsApp
          </label>
          <input
            type="text"
            name="noTelepon"
            onChange={handleInputChange}
            required
            className="input-field"
            placeholder="cth: 081234567890"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Pilih Sepeda
          </label>
          <select
            name="idSepeda"
            value={formData.idSepeda}
            onChange={handleInputChange}
            required
            className="input-field"
          >
            <option value="" disabled>
              -- Pilih Sepeda Tersedia --
            </option>
            {sepedaTersedia.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Pilih Paket Sewa
          </label>
          <select
            name="idPaket"
            value={formData.idPaket}
            onChange={handleInputChange}
            required
            className="input-field"
          >
            <option value="" disabled>
              -- Pilih Durasi --
            </option>
            {paketTersedia.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama}
              </option>
            ))}
          </select>
        </div>
        {paketTerpilih && (
          <div className="text-xl font-bold text-center my-6">
            Total: Rp {paketTerpilih.harga.toLocaleString("id-ID")}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg"
        >
          Lanjutkan ke Pembayaran
        </button>
      </form>
    </div>
  );
}
