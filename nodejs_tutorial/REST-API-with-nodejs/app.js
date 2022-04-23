const express = require('express');
const app = express();
const morgan = require('morgan');

const producRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');


app.use(morgan('dev'));
// app.use((req,res,next)=>{
//   res.status(200).json({
//     message: 'It works!'
//   });
// })


// Routes which should handle requests
app.use('/products',producRoutes);
app.use('/orders',ordersRoutes);

app.use((req,res,next)=>{
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
// Esta parte é responsável por pegar tanto os erros de rotas não encontradasa quanto erros que podem
//ocorrer dentro das rotas, por exemplo um erro de banco de dados
app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  })
});

module.exports = app;