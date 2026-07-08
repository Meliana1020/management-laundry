const express = require('express');
const router = express.Router();
const {
    getAllUser,
    getUserById,
    updateUser,
    resetPassword,
    deleteUser
} = require('../controller/admin.js');

const {
    getAllInventory,
    addInventory,
    updateInventory,
    deleteInventory,
    addStock
} = require('../controller/inventory.js');

const authMiddleware = require('../middleware/auth.js');


router.get('/get-all', authMiddleware, getAllUser);
router.get('/get-by', authMiddleware, getUserById);
router.put('/update-by', authMiddleware, updateUser);
router.put('/reset-password', authMiddleware, resetPassword);
router.delete('/delete-by', authMiddleware, deleteUser);

// // untuk inventory
router.get('/get-inventory', authMiddleware, getAllInventory);
router.post('/add-inventory', authMiddleware, addInventory);
router.put('/update-inventory', authMiddleware, updateInventory);
router.delete('/delete-inventory', authMiddleware, deleteInventory);
router.put('/add-stock', authMiddleware, addStock);

// // untuk ordernya
// router.post('/add-order',);
// router.get('/get-order',);
// router.get('/get-order-by/:user_id',);
// router.get('/get-order-by/:id',);
// router.put('/update-order/:id/status',);
// router.put('/update-order/:id',);
// router.delete('/delete-order/:id',);

// router.post('/add-order-item/:order_id/items',);
// router.put('/update-order-item/:item_id',);
// router.delete('/delete-order-item/:item_id',);


// // untuk pembayaran
// router.post('/add-payments',);
// router.get('/get-payments/:order_id',);
// router.put('/update-payments/:id/status',);


// // untuk upah karyawannya
// router.get('/get-payrolls', authMiddleware,);
// router.post('/add-payrolls', authMiddleware,);
// router.get('/get-payrolls/:order_id', authMiddleware,);
// router.delete('/delete-payrolls/:id', authMiddleware,);

// // untuk financenya
// router.get('/get-finance', authMiddleware,);
// router.post('/add-finance', authMiddleware,);
// router.post('/add-finance/income', authMiddleware,);
// router.delete('/delete-finance/:id', authMiddleware,);


// // untuk laporan
// router.get('/get-reports/daily', authMiddleware,);
// router.get('/get-reports/weekly', authMiddleware,);
// router.get('/get-reports/monthly', authMiddleware,);
// router.get('/get-reports/yearly', authMiddleware,);
// router.get('/get/dashboard', authMiddleware,);

module.exports = router;