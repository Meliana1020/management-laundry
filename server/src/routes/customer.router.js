const express = require('express');
const router = express.Router();
const {
    registrasiUser,
    loginUser,
    // resetPasswordUser,
    // updateUser,
    // deletUser
} = require('../controller/users.js');

// const authMiddleware = require('../middleware/auth.js');


router.post('/registrasi-user', registrasiUser);
router.post('/login-user', loginUser);
// router.put('/reset/password/:id', resetPasswordUser);
// router.put('/update/user-by/:id', updateUser);
// router.delete('/delete/user-by/:id', deletUser);


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