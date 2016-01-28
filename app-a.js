// Accessing the File System Module and storing it so I can
// access the methods of it later
var fs = require("fs");

// Using the File System Module to read in the contents of the
// current directory
fs.readdir("./", function(err, fileDir){
  // Looping through each of the files returned from the directory
  // and logging out their filename
  for(f in fileDir){
    console.log(fileDir[f]);
  }
});
