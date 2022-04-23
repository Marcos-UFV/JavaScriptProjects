import { Cliente } from "./Cliente.js";
import { ContaCorrente } from "./ContaCorrente.js";
import { ContaPoupanca } from "./ContaPoupanca.js";

const marcos  = new Cliente('Marcos',123456789);
const cc1 = new ContaCorrente(123,marcos);
cc1.depositar(1000);

const juliana = new Cliente('Juliana',987654321);
const cp1 = new ContaPoupanca(123,juliana,100.53);

const andre = new Cliente('André',654987321);

//cc1.transferir(100,cc2);
try {
  cc1.cliente = 0;  
} catch (e) {
  console.log(e.message);
}

cc1.sacar(100);
cp1.sacar(100);
console.log(cc1);
console.log(cp1);