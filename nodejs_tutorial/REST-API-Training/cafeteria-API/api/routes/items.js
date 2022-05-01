const express = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host:'localhost',
      user:'marcos',
      password:'aurelio',
      database:'cafeteria'
})

const router = express.Router();

router.get('/',(req,res,next) =>{
  const sql = "SELECT * FROM menu";
  connection.query(sql,(err,rows,fields)=>{
    if(!err) res.send(rows);
    console.log(err);
  });
})

module.exports = router;