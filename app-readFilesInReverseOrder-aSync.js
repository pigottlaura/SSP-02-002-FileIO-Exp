// Accessing the File System Module and storing it so I can
// access the methods of it later
var fs = require("fs");

// Creating an array to store all the files I read in, aswell as their
// data, so that they can be all printed out together in order at the
// end of them all being read in
var allFiles = [];

// Creating a constructor for a FileTemplate object, so that each file that
// is read in will store the same name value pairs (the filename, the contents of
// the file, the order in which it was requested and the order in which is was returned)
var FileTemplate = function(filename, fileContents, fileOrderNumber, fileReturnedAt){
  this.name = filename;
  this.contents = fileContents;
  this.orderNum = fileOrderNumber;
  this.returnedNum = fileReturnedAt;
};

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

var filesRead = 0;
var totalIgnoredFiles = 0;

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
        // Creating a temporary instance of the FileTemplate object,
        // which will store the filename, contents and index (of when this file
        // was requested) in it, so that it can then be passed to and stored
        // in the allFiles array. This is so I can store every files data,
        // and then print them all out at the one time
        var tempFile = new FileTemplate(file, data, index, filesRead);

        // Pushing the temporary object into the allFiles array
        allFiles.push(tempFile);

        // Incrementing the number of files that have returned their data, so that
        // I can later compare this number to the total files in the directory, excluding
        // the ones we ignored using the totalIgnoredFiles variable, so I know when all
        // files have returned their data
        filesRead++;

        // Checking if the number of files read is equal to the toal number of files
        // that were in the directory, minus the ones that we ignored
        if(filesRead == (fileDir.length - totalIgnoredFiles)){
          // Logging out that all files have now been read in
          console.log("All files have been read in \n");

          // Calling the sort files function, to rearrange the order in which the files
          // were stored in the array, to reflect the order in which they were requested,
          // as opposed to the order in which they were returned
          sortFiles();
        }
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

      // Incrementing the number of files that have been ignored, so that
      // I can later compare this number to the total files in the directory, and
      // the total number that have returned their data so far, so I know when all
      // files have returned their data
      totalIgnoredFiles++;
    }
  }

  // Returning a boolean value to say whether or not the currentFilename that was
  // passed in is going to be ignored or not i.e. do not read in any .js files
  return allowFile;
}

// Declaring the sort files function, to rearrange the order in which the files
// were stored in the array, to reflect the order in which they were requested,
// as opposed to the order in which they were returned
function sortFiles(){

  // Calling the sort method on the allFiles array, which contains an object for
  // each file that was read in. Passing in a function so that I can carry out
  // a custon sort. Giving this function two parametres, as each time the function
  // gets called, the sort method will pass in two objects from the array, so I
  // will us a and b to access the properties I want to sort by, and then compare
  // them within the function
  allFiles.sort(function(a, b){
    // Creating a locally scoped variable, which will store the answer I want to return
    // to the sort method. By default this answer will be set to 0, so that if the
    // statement is false, no effect will occur on the array
    var ans = 0;

    if(a.orderNum < b.orderNum){
      // If the orderNumber of a is less than the orderNumber of b, then return the value
      // of 1, which will move a 1 place forward in the array, past b
      ans = 1;
    }
    return ans;
  });

  // Calling the showContentsOfFiles funciton, to log out the results to the console (which
  // are now in the order which they were requested)
  showContentsOfFiles();
}

function showContentsOfFiles(){
  // Looping through each of the files I read in earlier
  for(f in allFiles){
    // Logging out their filename, contents and the order in which they returned their results
    console.log(allFiles[f].name + " contained: \n" + allFiles[f].contents + "\n which returned it's data in position " + allFiles[f].returnedNum + "\n");
  }
  saveToTxtFile();
}

function saveToTxtFile(){
  // Creating a searchResults variable to store the string that I want
  // to write to the search-results.txt file
  var searchResults = "Asynchronous SEARCH RESULTS (in reverse order)- " + Date() + "\n\r";

  for(al in allFiles)
  {
    // Storing the file data into the searchResults string, so it can be saved
    // in the search-results.txt file
    searchResults += allFiles[al].name + "\r" + "\t" + allFiles[al].contents + "\r\r";
  }

  fs.writeFile("search-results-app-readFilesInReverseOrder-aSync.txt", searchResults, function(err) {
    if(err)
    {
        console.log('\nERROR - file not saved: ' + err);
    } else {
      console.log('\nYour search results have been saved');
    }
  });
}
