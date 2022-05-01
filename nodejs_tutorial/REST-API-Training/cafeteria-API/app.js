const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const itemsRouter = require('./api/routes/items');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Prevent CORS error
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type,Accept,Authorization');
  if(req.method == 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','GET, PUT, POST,PATCH,DELETE')
    return res.status(200).json({});
  }
  next();

})

app.use('/items',itemsRouter);

app.use((req,res,next)=>{
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

module.exports = app;