
var fs = require('fs');
console.log("Going to get a file");

var onFileLoad = function(err, file ) {
	console.log("Got the file");
};

// Asynchornistly  reading file, non blocking way 
fs.readFile('readFileSync.js', onFileLoad); 

console.log("App continuess...");