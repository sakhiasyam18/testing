import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Sistem Persewaan Sepeda Profesional
      </h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl">
        Pilih kategori sepeda yang Anda inginkan dan nikmati perjalanan Anda.
        Proses cepat, aman, dan terpercaya.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <Link href="/sewa/premium" className="btn-kategori bg-indigo-600">
          Sewa Sepeda Premium
        </Link>
        <Link href="/sewa/reguler" className="btn-kategori bg-teal-600">
          Sewa Sepeda Reguler
        </Link>
      </div>
    </div>
  );
}

/* Catatan: Pastikan Anda memiliki styling untuk .btn-kategori di globals.css
  .btn-kategori {
    @apply text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-transform duration-300;
  }
*/
