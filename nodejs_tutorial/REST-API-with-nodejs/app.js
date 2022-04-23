const express = require('express');
const app = express();

const producRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');



// app.use((req,res,next)=>{
//   res.status(200).json({
//     message: 'It works!'
//   });
// })

app.use('/products',producRoutes);
app.use('/orders',ordersRoutes);

module.exports = app;