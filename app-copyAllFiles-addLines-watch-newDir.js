// Accessing the File System Module and storing it so I can
// access the methods of it later
var fs = require("fs");

// Creating an array of filenames or types that I would like to
// ignore i.e. I do not want to access the contents of any .js
// files as it would just result in me logging out the code
// from this, and potentially other apps.
// Reading in the "ignoreFiles.txt" file. When the string of data is
// returned from file, I am utilising JavaScript's chaining abilities
// to call the string .replace() method, to remove all "new line"
// breaks from the string. Finally, I am splitting the values
// it contains based on the , between them, and then storing these
// in the ignoreFiles array.
var ignoreFiles = fs.readFileSync("./ignoreFiles.txt", "utf8").replace(/\n/g, "").split(",");

var startLine = "--------------------THIS IS A BACKUP--------------------\r\n\r\n";

// Using the File System Module to read in the contents of the
// current directory
fs.watch("./", function(event, filename){
  console.log("The " + filename + " was " + event + "\n");
  // Checking if the name of the file that triggered the event is one of the files we are
  // choosing to ignore. If it is not, then the file will be copied into a new directory
  if(checkIgnoreFiles(filename))
  {
    var now = new Date();
    var epochTime = now.getTime();
    var newFolderName = "BACKUP-" + epochTime;

    fs.mkdir(newFolderName, function(err){
      // Reading in the contents of the current file, and logging then out to
      // the console
      fs.readFile(filename, "utf8", function(err, data){
        var now = new Date();
        var epochTime = now.getTime();

        // Adding the current date and time into the last line of the file
        var endLine = "\r\nThis file was backed up on the " + now;

        fs.writeFile(newFolderName + "/BACKUP-" + filename, startLine + data + endLine, function(err) {
          if(err)
          {
              console.log("\nERROR - file not backed up: " + err);
          } else {
            console.log("\n" + filename + " has been successfully backed up");
          }
        });

      })
    });
  }
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
