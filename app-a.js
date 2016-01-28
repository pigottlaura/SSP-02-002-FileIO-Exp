var fs = require("fs");

fs.readdir("./", function(err, fileDir){
  for(f in fileDir){
    console.log(fileDir[f]);
  }
});
