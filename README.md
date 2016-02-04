# SSP-02-002-FileIO-Exp

Experimenting with Node.js FileIO Capabilities

* app-read-current-directory-files.js
  * This file is the basis for all of the rest of the files in this repository. It reads in all of the files in the current directory, and logs their names out to the console. Any files that have been added to the "ignoreFiles.txt" file will be ignored, and their contents (or names) will not be read in. This is so that files such as my JavaScript, README and .git files will not be effected by anything I do in any of these apps
* app-readFilesInOrder-aSync.js
 * Reading in all the files in the current directory using fs.readDir(), storing their filename, contents, time requested and order returned values as an object in a global array. Using a custom .sort() function to sort these based on the time they were requested (once all files have been read in), and then writing the results of all the file's into a new file called "search-results-app-readFilesInOrder-aSync.txt" using the fs.writeFile() method
* app-readFilesInReverseOrder-aSync.js
  * Same as app-readFilesInOrder-aSync.js but reversing the order the files are written out using my custom sort function
* app-copyAllFiles-addLines-watch-newDir.js
  * Using the fs.watch() method to watch my current directory, and if a change is made to any of the file,
  use the fs.mkdir() method to make a new directory with the name "BACKUP" plus the current epoch time, and
  save a copy of the new file in there using the fs.readFile() and fs. writeFile() methods.
* app-copyAllFiles.js
  *  Copying all files, adding "COPY" to their current filename, using the fs.readFile() and fs.writeFile() methods.
* app-copyAllFiles-addLines.js
   * Same as app-copyAllFiles.js except adding a line to the beginning and end of the copied file, stating that this is a copy, as well as the date and time it was copied
* app-appendToFile.js
  * Using the fs.appendFile() method to add a new line to the end of each document in the current directory
* app-readFiles-Sync.js
