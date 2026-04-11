const express = require('express');
const cookieParser = require('cookie-parser');
const { syncDatabase } = require('./model/relasi.js');
const { sequelize } = require('./config/db.js');
const adminRouter = require('./routes/admin.router.js');
const customerRouter = require('./routes/customer.router.js');

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api/admin', adminRouter);
app.use('/api/customer', customerRouter);


(async () => {
    try {
  
      try {
  
        await sequelize.authenticate();
        console.log('Terhubung ke basis data');
    
      } catch (error) {
        console.error('Gagal terhubung ke basis data:', error.message);
      }
  
      await syncDatabase();
  
      app.listen(3000, () => {
        console.log('Server berjalan di port 3000');
      });
    } catch (error) {
      console.error('Gagal setup awal:', error.message);
    }
  })();
  