const express = require('express');
const router = express.Router();

const {
    registrasiUser,
    loginUser,
} = require('../controller/auth');


router.post('/registrasi-user', registrasiUser);
router.post('/login-user', loginUser);


module.exports = router;