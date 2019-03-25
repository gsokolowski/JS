
// create chiled process in node and use spawn method on that module

var child_process = require('child_process');
console.log(1);

// this is non blocking way of calling fibonacci
var newProcess = child_process.spawn('node', ['_fibonacci.js'], {
	stdio : 'inherit'
});

console.log(2);