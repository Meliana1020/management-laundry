const express = require('express');
const router = express.Router();



router.get('/get-customers', );
router.get('/get-customer-by/:id', );
router.delete('/delete-customer-by/:id', );


// untuk ordernya
router.post('/add-order', );
router.get('/get-order', );
router.get('/get-order-by/:user_id', );
router.get('/get-order-by/:id', );
router.put('/update-order/:id/status', );
router.put('/update-order/:id', );
router.delete('/delete-order/:id', );

router.post('/add-order-item/:order_id/items', );
router.put('/update-order-item/:item_id', );
router.delete('/delete-order-item/:item_id', );


// untuk pembayaran
router.post('/add-payments', );
router.get('/get-payments/:order_id', );
router.put('/update-payments/:id/status', );

// untuk stok
router.get('/get-stocks', );
router.post('/add-stocks', );
router.put('/update-stocks/:id', );
router.delete('/delete-stocks/:id', );

// untuk upah karyawannya
router.get('/get-payrolls', );
router.post('/add-payrolls', );
router.get('/get-payrolls/:order_id', );
router.delete('/delete-payrolls/:id', );

// untuk financenya
outer.get('/get-finance', );
router.post('/add-finance', );
router.post('/add-finance/income', );
router.delete('/delete-finance/:id', );


// untuk laporan
router.get('/get-reports/daily', );
router.get('/get-reports/weekly', );
router.get('/get-reports/monthly', );
router.get('/get-reports/yearly', );
router.get('/get/dashboard', );
