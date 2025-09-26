// src/app/page.tsx

"use client";

import React, { useState, useEffect } from "react";

// --- (1) SIMULASI DATA DARI DATABASE ---
// Berdasarkan skema SQL Anda

// Data Sepeda (dari tabel `sepeda`)
const mockSepeda = [
  {
    id: "SP001",
    nama: "Strattos S2",
    kategori: "Sepeda Premium",
    status: "Tersedia",
  },
  {
    id: "SP002",
    nama: "Strattos S3",
    kategori: "Sepeda Premium",
    status: "Dipinjam",
  },
  {
    id: "SP003",
    nama: "Monarch MJR",
    kategori: "Sepeda Reguler",
    status: "Tersedia",
  },
  {
    id: "SP004",
    nama: "Rugen",
    kategori: "Sepeda Reguler",
    status: "Tersedia",
  },
  {
    id: "SP005",
    nama: "Polygon Lovina",
    kategori: "Sepeda Reguler",
    status: "Tersedia",
  },
];

// Data Paket (dari tabel `paket`)
const mockPaket = [
  {
    id: "PK001",
    nama: "Paket 1 Reguler (24 Jam)",
    durasi: 24,
    kategori: "Sepeda Reguler",
    harga: 110000,
  },
  {
    id: "PK002",
    nama: "Paket 2 Reguler (7 Hari)",
    durasi: 168,
    kategori: "Sepeda Reguler",
    harga: 350000,
  },
  {
    id: "PK004",
    nama: "Paket 1 Premium (24 Jam)",
    durasi: 24,
    kategori: "Sepeda Premium",
    harga: 275000,
  },
  {
    id: "PK005",
    nama: "Paket 2 Premium (7 Hari)",
    durasi: 168,
    kategori: "Sepeda Premium",
    harga: 1400000,
  },
];

// Data Transaksi (gabungan dari `pemesanan`, `pelanggan`, `pembayaran`, dll)
const mockTransaksi = [
  {
    idPemesanan: "PM001",
    namaPelanggan: "Raka Setiawan",
    namaSepeda: "Strattos S2",
    namaPaket: "Paket 1 Premium (24 Jam)",
    tanggalMulai: new Date("2025-09-24T10:00:00"),
    tanggalSelesai: new Date("2025-09-25T10:00:00"),
    tanggalKembali: new Date("2025-09-25T13:00:00"), // Terlambat 3 jam
    statusPembayaran: "Lunas",
  },
  {
    idPemesanan: "PM002",
    namaPelanggan: "Joko Anwar",
    namaSepeda: "Monarch MJR",
    namaPaket: "Paket 2 Reguler (7 Hari)",
    tanggalMulai: new Date("2025-09-26T14:00:00"),
    tanggalSelesai: new Date("2025-09-30T14:00:00"),
    tanggalKembali: null, // Masih dipinjam
    statusPembayaran: "Lunas",
  },
];

// Tipe untuk data formulir
type FormData = {
  nama: string;
  noTelepon: string;
  idSepeda: string;
  idPaket: string;
};

// --- (2) KOMPONEN UTAMA APLIKASI ---

export default function SewaSepedaPage() {
  const [view, setView] = useState("landing"); // landing, form, payment, confirmation, admin
  const [kategori, setKategori] = useState<
    "Sepeda Premium" | "Sepeda Reguler" | null
  >(null);
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    noTelepon: "",
    idSepeda: "",
    idPaket: "",
  });
  const [sepedaList, setSepedaList] = useState(mockSepeda);
  const [transaksiList, setTransaksiList] = useState(mockTransaksi);

  const handleKategoriSelect = (
    kategoriPilihan: "Sepeda Premium" | "Sepeda Reguler"
  ) => {
    setKategori(kategoriPilihan);
    setView("form");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simulasi proses pembayaran dengan Midtrans
  const handleBayar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.idSepeda || !formData.idPaket) {
      alert("Silakan pilih sepeda dan paket terlebih dahulu.");
      return;
    }

    setView("payment");

    // Di aplikasi nyata, di sini Anda akan memanggil backend untuk mendapatkan token Midtrans
    // Lalu memanggil window.snap.pay(token)
    console.log("Memulai proses pembayaran untuk:", formData);

    // Simulasi callback dari Midtrans setelah 2 detik
    setTimeout(() => {
      // Update status sepeda menjadi 'Dipinjam'
      const sepedaBaru = sepedaList.map((s) =>
        s.id === formData.idSepeda ? { ...s, status: "Dipinjam" } : s
      );
      setSepedaList(sepedaBaru);

      // Tambah data transaksi baru
      const newTransaksi = {
        idPemesanan: `PM00${transaksiList.length + 1}`,
        namaPelanggan: formData.nama,
        namaSepeda:
          sepedaList.find((s) => s.id === formData.idSepeda)?.nama || "",
        namaPaket: mockPaket.find((p) => p.id === formData.idPaket)?.nama || "",
        tanggalMulai: new Date(),
        tanggalSelesai: new Date(
          new Date().getTime() +
            (mockPaket.find((p) => p.id === formData.idPaket)?.durasi || 0) *
              3600 *
              1000
        ),
        tanggalKembali: null,
        statusPembayaran: "Lunas",
      };
      setTransaksiList([...transaksiList, newTransaksi]);

      setView("confirmation");
    }, 2000);
  };

  // Render komponen berdasarkan state 'view'
  const renderView = () => {
    switch (view) {
      case "form":
        const sepedaTersedia = sepedaList.filter(
          (s) => s.kategori === kategori && s.status === "Tersedia"
        );
        const paketTersedia = mockPaket.filter((p) => p.kategori === kategori);
        const paketTerpilih = mockPaket.find((p) => p.id === formData.idPaket);

        return (
          <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Formulir Sewa - {kategori}
            </h2>
            <form onSubmit={handleBayar}>
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
                  placeholder="cth: 6281234567890"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Pilih Sepeda
                </label>
                <select
                  name="idSepeda"
                  onChange={handleInputChange}
                  required
                  className="input-field"
                >
                  <option value="">-- Pilih Sepeda Tersedia --</option>
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
                  onChange={handleInputChange}
                  required
                  className="input-field"
                >
                  <option value="">-- Pilih Durasi --</option>
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
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Bayar Sekarang
              </button>
            </form>
          </div>
        );
      case "payment":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Mengarahkan ke Pembayaran...</h2>
            <p>
              Mohon tunggu, simulasi pembayaran Midtrans sedang berlangsung.
            </p>
          </div>
        );
      case "confirmation":
        const linkWA = `https://wa.me/${formData.noTelepon}?text=Halo%20${formData.nama},%20pesanan%20sepeda%20Anda%20telah%20dikonfirmasi.%20Terima%20kasih!`;
        return (
          <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              Pembayaran Berhasil!
            </h2>
            <p className="mb-6">
              Pesanan Anda telah dikonfirmasi. Kami telah mengirimkan notifikasi
              ke nomor WhatsApp Anda.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-left">
              <p className="font-bold">Simulasi Notifikasi WhatsApp:</p>
              <p className="text-sm">
                Halo {formData.nama}, pesanan sepeda Anda telah dikonfirmasi.
                Detail:{" "}
                {sepedaList.find((s) => s.id === formData.idSepeda)?.nama} -{" "}
                {mockPaket.find((p) => p.id === formData.idPaket)?.nama}. Terima
                kasih!
              </p>
            </div>
            <a
              href={linkWA}
              target="_blank"
              className="inline-block mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Buka WhatsApp (Demo)
            </a>
            <button
              onClick={() => setView("landing")}
              className="mt-6 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Sewa Lagi
            </button>
          </div>
        );
      case "admin":
        return (
          <AdminDashboard
            sepedaList={sepedaList}
            transaksiList={transaksiList}
            setView={setView}
          />
        );
      default: // landing
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">
              Selamat Datang di Sewa Sepeda!
            </h1>
            <p className="mb-8">
              Silakan pilih kategori sepeda yang ingin Anda sewa:
            </p>
            <div className="flex justify-center gap-8">
              <button
                onClick={() => handleKategoriSelect("Sepeda Premium")}
                className="btn-kategori"
              >
                Sewa Sepeda Premium
              </button>
              <button
                onClick={() => handleKategoriSelect("Sepeda Reguler")}
                className="btn-kategori"
              >
                Sewa Sepeda Reguler
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      {view !== "admin" && (
        <button
          onClick={() => setView("admin")}
          className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          Dashboard Admin
        </button>
      )}
      {renderView()}
    </main>
  );
}

// --- (3) KOMPONEN DASHBOARD ADMIN ---

function AdminDashboard({
  sepedaList,
  transaksiList,
  setView,
}: {
  sepedaList: any[];
  transaksiList: any[];
  setView: (view: string) => void;
}) {
  // Fungsi untuk menghitung denda
  const hitungDenda = (transaksi: any) => {
    if (
      !transaksi.tanggalKembali ||
      transaksi.tanggalKembali <= transaksi.tanggalSelesai
    ) {
      return 0; // Tidak ada denda
    }
    const selisihMs =
      transaksi.tanggalKembali.getTime() - transaksi.tanggalSelesai.getTime();
    const jamTelat = Math.ceil(selisihMs / (1000 * 60 * 60));
    return jamTelat * 10000; // Denda 10k per jam
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <button
        onClick={() => setView("landing")}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-6"
      >
        &larr; Kembali ke Halaman Utama
      </button>
      <h2 className="text-3xl font-bold mb-6 text-center">Dashboard Admin</h2>

      {/* Tabel Kelola Sepeda */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">
          Kelola Ketersediaan Sepeda
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">ID Sepeda</th>
                <th className="py-2 px-4">Nama Sepeda</th>
                <th className="py-2 px-4">Kategori</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {sepedaList.map((sepeda) => (
                <tr key={sepeda.id} className="border-b text-center">
                  <td className="py-2 px-4">{sepeda.id}</td>
                  <td className="py-2 px-4">{sepeda.nama}</td>
                  <td className="py-2 px-4">{sepeda.kategori}</td>
                  <td
                    className={`py-2 px-4 font-bold ${
                      sepeda.status === "Tersedia"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {sepeda.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabel Laporan Transaksi */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Laporan Semua Transaksi</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">ID Pesanan</th>
                <th className="py-2 px-4">Pelanggan</th>
                <th className="py-2 px-4">Sepeda</th>
                <th className="py-2 px-4">Waktu Selesai Seharusnya</th>
                <th className="py-2 px-4">Waktu Kembali</th>
                <th className="py-2 px-4">Denda (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {transaksiList.map((trx) => {
                const denda = hitungDenda(trx);
                return (
                  <tr
                    key={trx.idPemesanan}
                    className="border-b text-center text-sm"
                  >
                    <td className="py-2 px-4">{trx.idPemesanan}</td>
                    <td className="py-2 px-4">{trx.namaPelanggan}</td>
                    <td className="py-2 px-4">{trx.namaSepeda}</td>
                    <td className="py-2 px-4">
                      {trx.tanggalSelesai.toLocaleString("id-ID")}
                    </td>
                    <td className="py-2 px-4">
                      {trx.tanggalKembali
                        ? trx.tanggalKembali.toLocaleString("id-ID")
                        : "Masih Dipinjam"}
                    </td>
                    <td
                      className={`py-2 px-4 font-bold ${
                        denda > 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {denda.toLocaleString("id-ID")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- CSS Tambahan untuk styling (opsional, bisa ditaruh di globals.css) ---
/* Letakkan ini di file css global Anda (misal: src/app/globals.css)

    .btn-kategori {
        @apply bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-transform;
    }

    .input-field {
        @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline;
    }
*/
