/*let array = [[1,2,3],[4,5,6],[7,8,9]];
for(let [index,win] of array.entries()){
  console.log(index,win);
}*/


/*let array = [1,2,3,4,5,6,7,8,9];
let a = [];
for(let i=0;i < array.length; i++){
  console.log(a.concat(i));
}
console.log(a);

a = array.reduce((a,e,i) => a.concat(i),a);
console.log(a);*/

let index = [0,1,2,3,4,5];
let values = [1,2,5];
console.log(values.indexOf(1));
console.log(index.every(elem => values.indexOf(elem) > -1));

values = values.concat([0,3,4]);

console.log(index.every(elem => values.indexOf(elem) > -1));


