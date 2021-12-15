class Conta{
  constructor(saldoInicial,cliente,agencia){
        this._agencia = agencia;
        this._saldo = saldoInicial;
        this._cliente = cliente;
   }
  set cliente(cliente){
    if(cliente instanceof Cliente)
      this._cliente = cliente;
    else throw new TypeError('Valor informado não é do tipo Cliente');
  }
  get cliente(){
    return this._cliente;
  }
  get saldo(){
      return this._saldo;
  }
  sacar(valor){
      let taxa = 1;
      this._sacar(valor,taxa);
  }
  _sacar(valor, taxa){
      let valorSacado = valor*taxa;
      if(this._saldo >= valorSacado){
        this._saldo -= valorSacado;
        return valorSacado;
      }
      return 0;
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
export {Conta};