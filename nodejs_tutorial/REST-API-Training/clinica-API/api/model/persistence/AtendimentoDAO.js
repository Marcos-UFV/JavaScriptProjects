const mysql = require('mysql');
class AtendimentoDAO{
  constructor(){
    this._mysqlConnection = mysql.createConnection({
      host:'localhost',
      user:'marcos',
      password:'aurelio',
      database:'lista8ex1'
    })
  }

  getAtendimentos(){
    return new Promise((resolve,reject)=>{
      const sql = "SELECT * FROM atendimento";
      this._mysqlConnection.query(sql,(err,rows,fields)=>{
        if(!err) resolve(rows);
        reject(err);
      })
    });
  }
  getAtendimentoByIdAndData(id,data){
    const sqlIdData = `SELECT * FROM atendimento WHERE cd_pac=${id} AND dia_atend='${data}'`;
    const sqlId = `SELECT * FROM atendimento WHERE cd_pac=${id}`;
    return new Promise((resolve,reject)=>{
      const sql = data?sqlIdData:sqlId;
      this._mysqlConnection.query(sql,(err,rows,fields)=>{
        if(!err) resolve(rows);
        reject(err);
      });
    })
  }

  getAtendimentoPorPaciente(id,data){
    var sql = "SELECT * FROM paciente NATURAL join atendimento";  
    if(id){
      sql = sql.concat(` WHERE cd_pac=${id}`);
      if(data) sql = sql.concat(` AND dia_atend='${data}'`);
    }   

    return new Promise((resolve,reject)=>{
        
      this._mysqlConnection.query(sql,(err,rows,fields)=>{
        if(!err) resolve(rows);
        reject(err);
      })
    });
  }
}

module.exports = AtendimentoDAO;