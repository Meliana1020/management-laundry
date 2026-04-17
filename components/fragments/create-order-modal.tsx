"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

export function CreateOrderModal() {
  const [weight, setWeight] = useState<number>(0);
  const [pricePerKg] = useState(7000); // Contoh harga per kg
  const [totalPrice, setTotalPrice] = useState(0);

  // Auto-kalkulasi harga setiap berat berubah
  useEffect(() => {
    setTotalPrice(weight * pricePerKg);
  }, [weight, pricePerKg]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Pesanan Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buat Pesanan Laundry</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Pilih Pelanggan</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih pelanggan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Budi Santoso</SelectItem>
                <SelectItem value="2">Siti Aminah</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Jenis Layanan</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih layanan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cuci-kering">Cuci Kering (Rp 7.000/kg)</SelectItem>
                <SelectItem value="setrika">Setrika (Rp 5.000/kg)</SelectItem>
                <SelectItem value="komplit">Cuci Kering Setrika (Rp 10.000/kg)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Total Berat (Kg)</Label>
              <Input 
                id="weight" 
                type="number" 
                placeholder="0.0" 
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Total Harga</Label>
              <div className="h-10 px-3 py-2 rounded-md bg-slate-100 font-bold flex items-center">
                Rp {totalPrice.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Batal</Button>
          <Button type="submit">Simpan Pesanan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}