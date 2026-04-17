import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

export default function ReportsPage() {
  const summary = [
    { label: "Total Pendapatan", value: "Rp 5.200.000", icon: ArrowUpCircle, color: "text-emerald-600" },
    { label: "Total Pengeluaran", value: "Rp 1.850.000", icon: ArrowDownCircle, color: "text-red-600" },
    { label: "Upah Karyawan", value: "Rp 750.000", icon: Wallet, color: "text-blue-600" },
    { label: "Keuntungan Bersih", value: "Rp 2.600.000", icon: DollarSign, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Laporan Keuangan</h2>
        <p className="text-muted-foreground">Analisis pendapatan, pengeluaran, dan laba bersih secara berkala.</p>
      </div>

      {/* Statistik Laba Rugi */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summary.map((item, i) => (
          <Card key={i} className="border-t-4 border-t-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rincian Transaksi Finansial */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>13/04/2026</TableCell>
                <TableCell>Operasional</TableCell>
                <TableCell>Beli Sabun & Detergen</TableCell>
                <TableCell><Badge variant="destructive">Expense</Badge></TableCell>
                <TableCell className="text-right text-red-600">- Rp 200.000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>13/04/2026</TableCell>
                <TableCell>Laundry</TableCell>
                <TableCell>Pembayaran ORD001</TableCell>
                <TableCell><Badge className="bg-emerald-100 text-emerald-700">Income</Badge></TableCell>
                <TableCell className="text-right text-emerald-600">+ Rp 45.000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>12/04/2026</TableCell>
                <TableCell>Upah</TableCell>
                <TableCell>Upah Harian Karyawan (Andi)</TableCell>
                <TableCell><Badge variant="destructive">Expense</Badge></TableCell>
                <TableCell className="text-right text-red-600">- Rp 75.000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}