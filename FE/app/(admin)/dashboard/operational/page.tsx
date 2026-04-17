"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Users } from "lucide-react";

export default function OperationalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Kebutuhan Operasional</h2>
        <p className="text-muted-foreground">Kelola stok barang dan perhitungan upah karyawan harian.</p>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="inventory" className="gap-2">
            <Package className="h-4 w-4" /> Stok Barang
          </TabsTrigger>
          <TabsTrigger value="payroll" className="gap-2">
            <Users className="h-4 w-4" /> Upah Karyawan
          </TabsTrigger>
        </TabsList>

        {/* TAB STOK BARANG */}
        <TabsContent value="inventory" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Stok Detergen & Alat</CardTitle>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Tambah Stok
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Barang</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Sisa Stok</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Detergen Cair 5L</TableCell>
                    <TableCell>Bahan Utama</TableCell>
                    <TableCell>2 Galon</TableCell>
                    <TableCell><Badge variant="outline">Aman</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Parfum Ocean Fresh</TableCell>
                    <TableCell>Pewangi</TableCell>
                    <TableCell>0.5 Liter</TableCell>
                    <TableCell><Badge variant="destructive">Hampir Habis</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB UPAH KARYAWAN */}
        <TabsContent value="payroll" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upah Harian (Non-Tetap)</CardTitle>
              <p className="text-xs text-muted-foreground italic">Dihitung per jumlah cucian</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Karyawan</TableHead>
                    <TableHead>Total Pekerjaan</TableHead>
                    <TableHead>Total Upah</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Andi</TableCell>
                    <TableCell>15 Kg (Cuci+Setrika)</TableCell>
                    <TableCell>Rp 75.000</TableCell>
                    <TableCell><Badge className="bg-emerald-100 text-emerald-700">Sudah Dibayar</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}