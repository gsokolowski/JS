// based on tutorial
// https://www.youtube.com/watch?v=s6SH72uAn3Q

// Promisses explained
// Basic example with parameter passed to promise

let promiseToCleanRoom = param =>
  new Promise(function(resolve, reject) {
    // cleaning the room

    let cleanRoom = param;

    if (cleanRoom) {
      resolve("clean");
    } else {
      reject("not Clean");
    }
  });

promiseToCleanRoom(false)
  .then(function(fromResolve) {
    console.log("Room is " + fromResolve);
  })
  .catch(function(fromReject) {
    console.log("Room is " + fromReject);
  });
