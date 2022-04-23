const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();
const gunzip = zlib.createGunzip();

// const readStream = fs.createReadStream('./example.txt','utf8');
// const writeStream = fs.createWriteStream('example2.txt.gz','utf8');

// readStream.pipe(gzip).pipe(writeStream);

const readStreamZip = fs.createReadStream('./example2.txt.gz');
const writeStreamUnzip = fs.createWriteStream('example2.txt','utf8');


readStreamZip.pipe(gunzip).pipe(writeStreamUnzip);