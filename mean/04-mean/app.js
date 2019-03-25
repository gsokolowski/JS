// instant require 
require('./instantHello'); // requre from the same folder ./ othervise it will pick up from node folder

// require through function - have a look into goodbye.js file, there is anonymous function 
// this function is assing to goodby var and called later as goodbye()
var goodbye = require('./talk/goodbye'); 	// inculeds /talk/goodbye.js
var talk = require('./talk/index'); 		// inculeds /talk/index.js
var question = require('./talk/question'); 	// inculeds /talk/question.js


talk.intro();
talk.hello('Greg');
var answer = question.ask('What is the meaning of Life?');
console.log(answer);

goodbye();