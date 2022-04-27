class Paciente{
  constructor({cod,nome,nasc,conv}){
    this._cod = cod?cod:0;
    this._nome = nome;
    this._dataNasc = nasc;
    this._codConv = conv;
  }

}


module.exports = Paciente;