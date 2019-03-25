
var answer = "This is good question";

// metode is exposed to app.js by cheining it to module.exports
module.exports.ask = function(question) {
	console.log(question);
	return answer;
};