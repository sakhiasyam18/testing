// Di sini kita simpan semua data tiruan (mock data)
// agar bisa diimpor dan digunakan di halaman mana pun.

export const mockSepeda = [
    { id: 'SP001', nama: 'Strattos S2', kategori: 'premium', status: 'Tersedia' },
    { id: 'SP002', nama: 'Strattos S3', kategori: 'premium', status: 'Dipinjam' },
    { id: 'SP003', nama: 'Monarch MJR', kategori: 'reguler', status: 'Tersedia' },
    { id: 'SP004', nama: 'Rugen', kategori: 'reguler', status: 'Tersedia' },
    { id: 'SP005', nama: 'Polygon Lovina', kategori: 'reguler', status: 'Tersedia' },
];

export const mockPaket = [
    { id: 'PK001', nama: 'Paket 1 Reguler (24 Jam)', durasi: 24, kategori: 'reguler', harga: 110000 },
    { id: 'PK002', nama: 'Paket 2 Reguler (7 Hari)', durasi: 168, kategori: 'reguler', harga: 350000 },
    { id: 'PK004', nama: 'Paket 1 Premium (24 Jam)', durasi: 24, kategori: 'premium', harga: 275000 },
    { id: 'PK005', nama: 'Paket 2 Premium (7 Hari)', durasi: 168, kategori: 'premium', harga: 1400000 },
];

// Anda bisa menambahkan data transaksi di sini juga jika diperlukan di banyak tempat