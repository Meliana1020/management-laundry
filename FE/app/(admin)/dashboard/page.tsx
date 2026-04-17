import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, ShoppingBag, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Pesanan Hari Ini", value: "12", icon: ShoppingBag, color: "text-blue-600" },
    { label: "Total Pelanggan", value: "156", icon: Users, color: "text-orange-600" },
    { label: "Pendapatan Hari Ini", value: "Rp 850.000", icon: TrendingUp, color: "text-emerald-600" },
    { label: "Belum Lunas", value: "5", icon: AlertCircle, color: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder untuk tabel pesanan terbaru */}
      <Card>
        <CardHeader>
          <CardTitle>Pesanan Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground italic">
            Menunggu data dari backend...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}