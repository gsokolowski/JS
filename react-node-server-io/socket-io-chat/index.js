/*
  This is server side code, server socket
 */

// define express function and require express module from node_modules it will look automaticaly for it into node_modules
let express = require("express");

// define socketIo function and load socket module from node_modules - socketIo is a function which you can call later in the code
let socketIo = require("socket.io");

// App setup
let app = express(); // call that express() function

// set server var which will be an app which is listennign on port 4000 on browser - you can put any number you like e.g 1234
let server = app.listen(4000, function () {
  console.log("...listening to request on port 4000");
});

// Static files
app.use(express.static("public")); //looks for index.html and serves it

// How Socket works?
// setup socket.io
// we want socket.io to work on server defined above
// so pass server into socketIo function
// Socket.io will be siting around now on the server and waiting for client or browser to make a connection
// and setup a websocket between this two
let io = socketIo(server); // io is a variable not a function. socketIo is a function

// so listen out for when that connection is made
// listening for event called connection from a brawser
// when we make a connection pass a callback function which fires once the connection is made
// callback function is receiving an object called socket and this object comes from client and every client has its own socket object to pass
io.on("connection", socket => {
  console.log("socket connection made", socket.id);
  // inside this function you are listining for message called 'chatMessage' from client

  // Handle chat event
  socket.on("chatMessage", data => {
    console.log("chatMessage received ", data);
    // data is a message data passed from client
    // now you can send thid message to all clients
    io.sockets.emit("chatMessage", data); // send data message to all
    // and here you can update database with the data which is passsed
  });

  socket.on("typingMessage", data => {
    console.log("typingMessage received ", data);
    socket.broadcast.emit("typingMessage", data); // broadcast info apart from original user who send mesasge
  });
});

// Now you need to make that connection on front end - and front end is  in public folder
