const fs = require('fs');
// fs.mkdir('tutorial',(err)=>{
//     if(err)
//         console.log(err);
//     else{
//         console.log('folder successfully created');
//         fs.writeFile('./tutorial/example.txt','123',(errr)=>{
//             if(err)
//                 console.log(err);
//             else
//                 console.log('Successfully created file');
//         })
//     }
        
        
// });
// fs.rmdir('tutorial1',(err)=>{
//     if(err)
//         console.log(err)
//     else
//         console.log('Successfully deleted the folder');
// });
// fs.unlink('./tutorial/example.txt',(err)=>{
//     if(err)
//         console.log(err);
//     else{
//         console.log('File was successfully deleted');
//         fs.rmdir('tutorial',(err)=>{
//             if(err)
//                 console.log(err);
//             else
//                 console.log('Deleted folder');
//         });
//     }
// });
fs.readdir('tutorial',(err,files)=>{
    if(err)
        console.log(err);
    else{
        console.log(`Files in the directory ${files}`);
        for(let file of files){
            fs.unlink(`./tutorial/${file}`,(err)=>{
                if(err)
                    console.log(err);
                else
                    console.log('Successfully deleted file');
            });
        }
        fs.rmdir('tutorial',(err)=>{
            if(err)
                console.log(err);
            else
                console.log('Folder successfully deleted');
        })
    }
})