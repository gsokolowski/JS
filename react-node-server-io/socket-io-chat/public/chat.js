// Make Connection
const socket = io("http://localhost:4000");

// Query DOM
let message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

// Emit events
// add event listener on button btn field defined above
btn.addEventListener("click", function() {
  // we are litenning for a click
  // we want to emiit 'chatMessage' with body message and handle
  console.log("client emiting");
  socket.emit("chatMessage", {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
  message.value = "";
});

// add event listener on button btn field defined above
// we are litenning for a keypress
message.addEventListener("keypress", function() {
  socket.emit("typingMessage", handle.value); // typing message we emit and this will be broadcast to all but original user sending this typing message
});

// Listen for events
socket.on("chatMessage", data => {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typingMessage", data => {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
