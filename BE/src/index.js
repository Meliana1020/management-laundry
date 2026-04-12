const express = require('express');
const cookieParser = require('cookie-parser');
const { initDatabase } = require('./config/init.js');

const userRouter = require('./routes/user.router.js');
const adminRouter = require('./routes/admin.router.js');
const customerRouter = require('./routes/customer.router.js');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', userRouter);

app.use('/api/admin', adminRouter);
app.use('/api/customer', customerRouter);

(async () => {

  await initDatabase(); 

  app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
  });
})();