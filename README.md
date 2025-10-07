# management-laundry
This project aims to build a website-based laundry management system using an MVP (Minimum Viable Product) approach. The system focuses on digitizing customer records, orders, and payments, generating multiple reports, and providing customers with access to real-time updates to their laundry status.


# manajemen-laundry
Proyek ini bertujuan untuk membangun sistem manajemen laundry berbasis web dengan pendekatan MVP (Minimum Viable Product).
Sistem ini berfokus pada digitalisasi data pelanggan/customer records, pesanan/orders, pembayaran/payment, menghasilkan berbagai laporan, serta memberikan akses kepada pelanggan untuk memantau status laundry mereka secara real-time.

 ## Aktor yang Dapat Mengakses Sistem

Sistem ini dapat diakses oleh 2 aktor dengan peran dan hak akses yang berbeda, yaitu:


1. Admin / Pemilik Laundry
    Memiliki akses penuh terhadap sistem:
    - Melihat dan mengelola daftar pesanan laundry.
    - Mengubah status pesanan (*dijemput → dicuci → disetrika → selesai → diambil*).
    - Mengelola data pelanggan.
    - Menerima dan mencatat pembayaran pelanggan.
    - Membuat laporan keuangan.

2. Pelanggan / Customer
    Memiliki akses terbatas sesuai kebutuhan:
    - Melihat status laundry secara real-time.
    - Melihat riwayat transaksi dan pembayaran.
    - Membuat pesanan baru.
    - Memperbarui data profil pribadi.


## Rancangan Tabel 

1. table users 
2. table order
3. table item_orders
4. table payments
