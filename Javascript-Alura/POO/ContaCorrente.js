import {Conta} from "./Conta.js";
class ContaCorrente extends Conta{
  static numerodeContas = 0;
  constructor(agencia,cliente){
    super(0,cliente,agencia);
    ContaCorrente.numerodeContas++;
  }  

  //sobreescrevendo o método sacar
  sacar(valor){
    let taxa = 1.1;
    return super._sacar(valor,taxa);
  }
}

export {ContaCorrente};