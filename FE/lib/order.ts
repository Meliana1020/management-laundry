import * as z from "zod";

export const orderSchema = z.object({
  user_id: z.string().min(1, "Pilih pelanggan"),
  jenis_layanan: z.string().min(1, "Pilih layanan"),
  total_berat: z.number().min(0.1, "Minimal 0.1kg"),
  status_pembayaran: z.enum(["Lunas", "Belum Lunas", "Sisa"]),
});