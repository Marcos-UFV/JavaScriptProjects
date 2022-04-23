const fs = require('fs');
const readStream = fs.createReadStream('./example.txt');
const writeStream = fs.createWriteStream('example2.txt');

readStream.on('data',(chunk)=>{
    //console.log(chunk);
    writeStream.write(chunk);
});

// Readable and Writable Streams permite a leitura de pedaços do arquivo que se deseja consumir
// Isso é extremamente útil para manipulação de arquivos grandes.
// Com readFile isso não é possível devido à necessidade de armazenar o arquivo inteiro no buffer de memória.