const fs = require('fs');
//fs.writeFile('example.txt',"This is an exemple",(err)=>{
//     if(err)
//         console.log(err);
//     else{
//         console.log('File sucessfully created');
//         fs.readFile('example.txt','utf8',(err,file)=>{
//             if(err)
//                 console.log(err)
//             else
//                 console.log(file);
//         });
//     }
        
// });

// fs.rename('example.txt','example2.txt',(err)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log('Successfully renamed the file');
// });

// fs.appendFile('example2.txt',' Some data being appended',(err)=>{
//     if(err)
//         console.log(err)
//     else
//         console.log('Successfully appended data to file');
// })

fs.unlink('example2.txt',(err)=>{
    if(err)
        console.log(err)
    else
        console.log('Successfully deleted the file');
});