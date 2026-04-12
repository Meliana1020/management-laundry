const express = require('express');
const router = express.Router();
const {
   getByIdCustomer,
   updateCustomer,
   deleteCustomer,
   resetPasswordUser
} = require('../controller/users.js');
const authMiddleware = require('../middleware/auth.js');

router.get('/get-customer-by/:id', authMiddleware, getByIdCustomer);
router.put('/update/customer-by/:id', authMiddleware, updateCustomer);
router.delete('/delete/customer-by/:id', authMiddleware, deleteCustomer);
router.put('/reset/password-customer-by/:id', authMiddleware, resetPasswordUser);



// // untuk ordernya
// router.post('/add-order', );
// router.get('/get-order', );
// router.get('/get-order-by/:user_id', );
// router.get('/get-order-by/:id', );
// router.put('/update-order/:id/status', );
// router.put('/update-order/:id', );
// router.delete('/delete-order/:id', );

// router.post('/add-order-item/:order_id/items', );
// router.put('/update-order-item/:item_id', );
// router.delete('/delete-order-item/:item_id', );

module.exports = router;