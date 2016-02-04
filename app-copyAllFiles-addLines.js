// Accessing the File System Module and storing it so I can
// access the methods of it later
var fs = require("fs");

// Creating an array of filenames or types that I would like to
// ignore i.e. I do not want to access the contents of any .js
// files as it would just result in me logging out the code
// from this, and potentially other apps.
var ignoreFiles = [
  ".js",
  ".md",
  ".git",
  "search-results"
];

// Using the File System Module to read in the contents of the
// current directory
fs.readdir("./", function(err, fileDir){
  // Looping through each of the files returned from the directory. As then
  // reference to the file itself will be passed into this callback function,
  // I am including a name for it (file) so that I can reference it
  // when logging out the details of the file
  fileDir.forEach(function(file, index){
    // Before I do anything with the file, I first want to call
    // the checkIgnoreFiles function (passing in the name of the current
    // file) to see whether this file contains any of the filenames or
    // extenstions which I am choosing to ignore i.e. js files
    if(checkIgnoreFiles(file))
    {
      // Reading in the contents of the current file, and logging then out to
      // the console
      fs.readFile(file, "utf8", function(err, data){

        fs.writeFile("COPY-" + file, data, function(err) {
          if(err)
          {
              console.log("\nERROR - file not copied: " + err);
          } else {
            console.log("\n" + file + " has been successfully copied");
          }
        });

      })
    }
  });
});

// Creating the checkIgnoreFiles function (which takes in one parametre)
// which is called before a file is read/manipulated, to check if it
// one of the files I have chosen to ignore
function checkIgnoreFiles(currentFilename){
  // Creating an allowFile variable, which will be true by default. Basically
  // I am going to assume that all files are allowed, until proven otherwise
  var allowFile = true;

  // Looping through all of the filenames and extensions that i have stored
  // in the ignoreFiles array
  for(i in ignoreFiles){
    // Checking if any of the filenames or extensions I have chosen to ignore
    // have an index position within the currentFilename that is greater than
    // -1 i.e. if the currentFilename contains ".js" (for example), and ".js"
    // is an extension I have chosen to ignore, the it will have an index position
    // within the currentFilename
    if(currentFilename.indexOf(ignoreFiles[i]) > -1){
      // If the currentFilename contains a filename or extension which I have chosen
      // to ignore, then allowFile is set to false i.e. this file will not be allowed
      allowFile = false;
    }
  }

  // Returning a boolean value to say whether or not the currentFilename that was
  // passed in is going to be ignored or not i.e. do not read in any .js files
  return allowFile;
}
