const fs = require("fs");
const path = require("path");

// Create folder
// fs.mkdir(path.join(__dirname, "/test"), {}, (err) => {
//     if(err) throw err;
//     console.log("Folder created...");    
// });

// Create and write to file
// fs.writeFile(
//     path.join(__dirname, "/test", "hello3.txt"), 
//     "Hello World!",
//     (err) => {
//         if(err) throw err;
//         console.log("File created and written to...");  

//         //Fille append
//         fs.appendFile(
//             path.join(__dirname, "/test", "hello3.txt"), 
//             "Hello World 2!",
//             (err) => {
//                 if(err) throw err;
//                 console.log("File created and written to...");  
//             }
//         );
//     }
// );

// Read file 
// fs.readFile(
//     path.join(__dirname, "/test", "hello3.txt"), 
//     "utf8",
//     (err, data) => {
//         if(err) throw err;
//         console.log(data);  
//     }
// );

// Rename file
fs.rename(
    path.join(__dirname, "/test", "hello3.txt"), 
    path.join(__dirname, "/test", "helloNewName.txt"),
    (err) => {
        if(err) throw err;
        console.log("File renamed...");  
    }
);


