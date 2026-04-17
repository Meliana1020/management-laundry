"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Eye, Edit } from "lucide-react";
import { CreateOrderModal } from "@/components/fragments/create-order-modal";

const initialOrders = [
  { id: "ORD001", customer: "Budi Santoso", service: "Cuci Kering", weight: "3kg", total: "Rp 21.000", status: "Proses", payment: "Belum Lunas" },
  { id: "ORD002", customer: "Siti Aminah", service: "Setrika", weight: "2kg", total: "Rp 10.000", status: "Selesai", payment: "Lunas" },
];

type Order = (typeof initialOrders)[number];

function EditStatusDialog({ order, onSave }: { order: Order; onSave: (id: string, status: Order["status"]) => void }) {
  const [status, setStatus] = useState<Order["status"]>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <Edit className="h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Status Cucian</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Status Cucian</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as Order["status"])}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Proses">Proses</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="outline">Batal</Button>
          </DialogClose>
          <Button onClick={() => onSave(order.id, status)}>Simpan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusSave = (id: string, status: Order["status"]) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Daftar Pesanan</h2>
          <p className="text-muted-foreground">Pantau dan update status cucian pelanggan secara real-time.</p>
        </div>
        <CreateOrderModal />
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Order</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Berat/Qty</TableHead>
              <TableHead>Total Harga</TableHead>
              <TableHead>Status Cucian</TableHead>
              <TableHead>Pembayaran</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.weight}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge variant={order.status === "Selesai" ? "default" : "outline"}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={order.payment === "Lunas" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                    {order.payment}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex justify-end">
                  <EditStatusDialog order={order} onSave={handleStatusSave} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}