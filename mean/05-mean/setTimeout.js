console.log("1: Start app");

function waiting() {
	console.log("2: In the setTimeout was doing waiting...");
}

var holdOn = setTimeout(waiting, 2000);

console.log("3: End app");