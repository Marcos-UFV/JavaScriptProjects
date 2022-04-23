const EventEmitter = require('events');
const tutorial = require('./tutorial');

const eventEmitter = new EventEmitter();

eventEmitter.on('tutorial',(num1,num2)=>{
    console.log(`tutorial event has occurred. The sum is ${tutorial.sum(num1,num2)}`);
});

eventEmitter.emit('tutorial',1,5);

class Person extends EventEmitter{
    constructor(name){
        super();
        this._name = name;
    }
    get name(){
        return this._name;
    }
}

let pedro  = new Person('Pedro');
let christina = new Person('Christina');
christina.on('name',()=>{
    console.log(`My name is ${christina.name}`);
})

pedro.on('name',()=>{
    console.log(`My name is ${pedro.name}`);
});

pedro.emit('name');
christina.emit('name');