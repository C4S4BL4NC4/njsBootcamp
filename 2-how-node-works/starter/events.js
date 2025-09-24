const EventEmitter = require("events");
const http = require("http");
// const myEmitter = new EventEmitter();

// // like clicking on a button.
// let items = 9;
// myEmitter.on("newSale", () => {
//   console.log("newSale made");
// });
// myEmitter.on("newSale", () => {
//   console.log("Costumer name ABC");
// });

// myEmitter.on("newSale", (stock) => console.log(stock));

// myEmitter.emit("newSale", --items);
// console.log(items);

/////////////////////////////

// const server = http.createServer();

// server.on("request", (req, res) => {
//   console.log("Request Recieved");
//   res.end("Request Recieved");
// });
// server.on("request", (req, res) => {
//   console.log("Another Request");
// });

// server.on("close", () => {
//   console.log("Server is shutting down");
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Waiting for requests..");
// });

////////////////////////////////////
