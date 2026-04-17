"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, MoreHorizontal } from "lucide-react";

const customers = [
  { id: "1", name: "Budi Santoso", email: "budi@gmail.com", phone: "08123456789", orders: 5 },
  { id: "2", name: "Siti Aminah", email: "siti@gmail.com", phone: "08567890123", orders: 2 },
  { id: "3", name: "Agus Setiawan", email: "agus@gmail.com", phone: "08991234567", orders: 12 },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = useMemo(
    () =>
      customers.filter((customer) => {
        const normalizedQuery = searchQuery.toLowerCase().trim();
        if (!normalizedQuery) {
          return true;
        }

        return (
          customer.name.toLowerCase().includes(normalizedQuery) ||
          customer.email.toLowerCase().includes(normalizedQuery)
        );
      }),
    [searchQuery]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Pelanggan</h2>
          <p className="text-muted-foreground">Kelola data dan lihat riwayat transaksi pelanggan.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Tambah Pelanggan
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Cari nama atau email..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>No. Telepon</TableHead>
              <TableHead className="text-center">Total Pesanan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell className="text-center">{customer.orders}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}