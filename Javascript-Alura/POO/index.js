import { Cliente } from "./Cliente.js";
import { ContaCorrente } from "./ContaCorrente.js";

const marcos  = new Cliente('Marcos',123456789);
const cc1 = new ContaCorrente(123,marcos);
cc1.depositar(1000);

const juliana = new Cliente('Juliana',987654321);
const cc2 = new ContaCorrente(123,juliana);

const andre = new Cliente('André',654987321);

cc1.transferir(100,cc2);
try {
  cc1.cliente = 0;  
} catch (e) {
  console.log(e.message);
}


console.log(cc1);
console.log(cc2);
console.log(ContaCorrente.numerodeContas);