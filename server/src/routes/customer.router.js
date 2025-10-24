const express = require('express');
const router = express.Router();



router.get('/get-customers/orders', );
router.get('/get-customers/orders/:id', );
router.get('/get-customers/payments', );

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
