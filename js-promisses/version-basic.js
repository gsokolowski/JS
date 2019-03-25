// based on tutorial
// https://www.youtube.com/watch?v=s6SH72uAn3Q

// Promisses explained
// Basic example

let promiseToCleanRoom = new Promise(function(resolve, reject) {
  // cleaning the room

  let cleanRoom = false;

  if (cleanRoom) {
    resolve("clean");
  } else {
    reject("not clean");
  }
});

promiseToCleanRoom
  .then(function(fromResolve) {
    console.log("Room is " + fromResolve);
  })
  .catch(function(fromReject) {
    console.log("Room is " + fromReject);
  });
