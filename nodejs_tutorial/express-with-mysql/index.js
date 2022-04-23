const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const { application } = require('express');

const app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
  host:'localhost',
  user:'marcos',
  password:'aurelio',
  database:'employeeDB'
});


mysqlConnection.connect((err) =>{
  if(!err)
    console.log('DB connection succeded!');
  else
    console.log(`DB connection failed\n ${JSON.stringify(err,undefined,2)}`);
})

app.listen(3000,()=> console.log('Express server is running at port 3000'));

// Get all employee
// app.get('/employee',(req,res)=>{
//   mysqlConnection.query('SELECT * FROM employee',(err,rows,fields)=>{
//     if(!err)
//       res.send(rows);
//     else
//       console.log(`Query Error ${err}`);
//   })
// })

// Get an employee by EmpID
app.get('/employee/:id',(req,res) =>{
  const id = req.params.id;
  mysqlConnection.query(`SELECT * FROM employee WHERE EmpID=${id}`,(err,rows,fields)=>{
    if(!err) res.send(rows);
    else console.log(err);
  })
})

// Get all employee ordered by queryOrder
app.get('/employee',(req,res)=>{
  
  const orderQuery = req.query.order?req.query.order:'EmpID';
  
  mysqlConnection.query(`SELECT * FROM employee ORDER BY ${orderQuery}`,(err,rows,fields)=>{
    if(!err)
      res.send(rows);
    else
      console.log(`Query Error ${err}`);
  })
});

// Delete an employee
app.delete('/employee/:id',(req,res)=>{
  const id = req.params.id;
  mysqlConnection.query(`DELETE FROM employee WHERE EmpID=${id}`,(err,rows,fields)=>{
    if(!err) res.send('Deleted sucessfuly!');
    else console.log(err);
  });
})

// Insert an employee
app.post('/employee',(req,res)=>{
  var {Name,EmpCode,Salary} = req.body;
  var sqlQuery = `CALL EmployeeAddOrEdit(${0},'${Name}','${EmpCode}',${Salary});`;
  mysqlConnection.query(sqlQuery,(err,rows,fields)=>{
    if(!err)res.send(rows);
    else console.log(err);
  })
});

// Update an employee

app.put('/employee',(req,res)=>{
  
  let {EmpID,Name,EmpCode,Salary} = req.body;
  let sqlQuery = `CALL EmployeeAddOrEdit(${EmpID},'${Name}','${EmpCode}',${Salary});`;
  mysqlConnection.query(sqlQuery,(err,rows,fields)=>{
    if(!err) res.send('Updated successfully!');
    else console.log(err);
  });
});