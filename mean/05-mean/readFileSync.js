
var fs = require('fs');
console.log("Going to get a file");

// Synchronistly readig file, bocking way 
var file = fs.readFileSync('readFileSync.js'); // just read this file - if file was big enoght you woul have problem

console.log("Got the file");
console.log("App continuess...");