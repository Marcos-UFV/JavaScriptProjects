import {Cliente} from "./Cliente.js";
class ContaCorrente{
  static numerodeContas = 0;
  constructor(agencia,cliente){
    this.agencia = agencia;
    this._saldo = 0;
    this._cliente = cliente;
    ContaCorrente.numerodeContas++;
  }
  set cliente(cliente){
    if(cliente instanceof Cliente)
      this._cliente = cliente;
    else throw new TypeError('Valor informado não é do tipo Cliente');
  }
  get cliente(){
    return this._cliente;
  }

  sacar(valor){
    if(this._saldo >= valor){
      this._saldo -= valor;
      return valor;
    }
  }
  depositar(valor){
    if(valor <= 0) return;
    this._saldo += valor;
  }

  transferir(valor,conta){
    const valorSacado = this.sacar(valor);
    conta.depositar(valorSacado);
  }
}

export {ContaCorrente};