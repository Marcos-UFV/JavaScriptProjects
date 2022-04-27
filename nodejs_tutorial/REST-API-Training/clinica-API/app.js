const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const pacientesRoutes = require('./api/routes/pacientes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Rotas que devem lidar com requisições
app.use('/pacientes',pacientesRoutes);

app.get((req,res,next)=>{
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

module.exports = app;