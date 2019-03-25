// in this file you have couple of methodes which will be called on app.js
// you  define methodes and then export them to make functions available to app.js

var filename = 'index.js'; // private property 

var hello = function(name) {
	console.log("Hello " + name);
};

var intro = function() {
	console.log("I'm node file colled " + filename);
};

module.exports = {
	hello : hello,
	intro : intro
};