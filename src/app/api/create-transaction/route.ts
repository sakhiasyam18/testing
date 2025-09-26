// src/app/api/create-transaction/route.ts

import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";

export async function POST(request: Request) {
  const { order_id, gross_amount, item_details, customer_details } =
    await request.json();

  // Inisialisasi Snap API
  let snap = new midtransClient.Snap({
    isProduction: false, // Pastikan ini false untuk sandbox
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
  });

  // Siapkan parameter transaksi
  let parameter = {
    transaction_details: {
      order_id: order_id, // ID pesanan yang unik
      gross_amount: gross_amount, // Total harga
    },
    item_details: item_details, // Detail item [ { id, price, quantity, name } ]
    customer_details: customer_details, // Detail pelanggan { first_name, email, phone }
  };

  try {
    const token = await snap.createTransactionToken(parameter);
    console.log("Midtrans transaction token created:", token);
    return NextResponse.json({ token });
  } catch (e: any) {
    console.error("Error creating Midtrans transaction:", e.message);
    return new NextResponse(e.message, { status: 500 });
  }
}
