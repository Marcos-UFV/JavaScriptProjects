const express = require('express');
const app =  express();


app.get('/',(req,res) =>{
  res.send('Hello World');
});
app.get('/example',(req,res) =>{
  res.send('hitting example route');
});
const inputParams = ({name,age})=>`Your name is\n ${name} and your age is ${age}`;


app.get('/example/:name/:age',(req,res)=>{
  console.log(req.params);
  console.log(req.query);
  res.send(inputParams(req.params));
});


app.listen(3000);
