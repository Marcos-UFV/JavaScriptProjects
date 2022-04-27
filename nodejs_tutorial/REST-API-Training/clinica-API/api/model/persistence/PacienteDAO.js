const mysql = require('mysql');
class PacienteDAO{
  constructor(){
    this._mysqlConnection = mysql.createConnection({
      host:'localhost',
      user:'marcos',
      password:'aurelio',
      database:'lista8ex1'
    });
  }

  testaConexao(){
    this._mysqlConnection.connect((err)=>{
      if(!err) console.log('DB connecction succeded!');
      else console.log(`DB connection faailed\n ${JSON.stringify(err,undefined,2)}`);
    })
  }
  getPacientes(func,order){
    
    this._mysqlConnection.query(`SELECT * FROM paciente ORDER BY ${order}`,(err,rows,fields)=>{
      if(!err) func.send(rows);
      else console.log(err); 
    });
  }

  getPacienteById(func,id){
    this._mysqlConnection.query(`SELECT * FROM paciente WHERE cd_pac=${id}`,(err,rows,fields)=>{
      if(!err) func.send(rows);
      else console.log(err);
    });
  }
  insertPaciente(func,paciente){
    const {_cod,_nome,_dataNasc,_codConv} = paciente;
    this._mysqlConnection.query(`INSERT INTO paciente VALUES(${_cod},'${_nome}','${_dataNasc}',${_codConv})`,(err,rows,fields)=>{
      if(!err) func.send(rows);
      else console.log(err);
    })
  }

  updatePaciente(func,paciente){
    const {_cod,_nome,_dataNasc,_codConv} = paciente;
    this._mysqlConnection.query(`UPDATE paciente SET nm_pac='${_nome}',dt_nasc='${_dataNasc}',conv_pac=${_codConv} WHERE cd_pac=${_cod}`,(err,rows,fields)=>{
      if(!err) func.send(rows);
      else console.log(err);
    })

  }
}

module.exports = PacienteDAO;