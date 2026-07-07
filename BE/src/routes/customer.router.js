const express = require('express');
const router = express.Router();
const {
   getByIdCustomer,
   updateCustomer,
   deleteCustomer,
   resetPasswordUser
} = require('../controller/customer.js');
const {
   addOrder,
   getAllOrder,
   getOrderByUser,
   getOrderById,
   updateOrderByStatus,
   updateOrderById,
   deleteOrder
} = require('../controller/order.js');
const { 
   addOrderItem, 
   updateOrderItem, 
   deleteOrderItem 
}= require('../controller/orderItem.js');

const authMiddleware = require('../middleware/auth.js');

router.get('/get-customer', authMiddleware, getByIdCustomer);
router.put('/update-customer', authMiddleware, updateCustomer);
router.put('/reset-password', authMiddleware, resetPasswordUser);
router.delete('/delete-customer', authMiddleware, deleteCustomer);



// // untuk ordernya
router.post('/add-order', addOrder); 
router.get('/get-order', getAllOrder);
router.get('/get-order/user/:user_id', getOrderByUser);
router.get('/get-order/:id', getOrderById);
router.put('/update-order/:id/status', updateOrderByStatus); 
router.put('/update-order/:id', updateOrderById); 
router.delete('/delete-order/:id', deleteOrder);


router.post('/add-order-item/:order_id/items', addOrderItem);
router.put('/update-order-item/:item_id', updateOrderItem);
router.delete('/delete-order-item/:item_id', deleteOrderItem);

module.exports = router;