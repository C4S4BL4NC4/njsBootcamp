const fs = require("fs");
const crypto = require("crypto");

setTimeout(() => console.log("Timer 1 finished"), 0); // Expired
setTimeout(() => console.log("Immediate 1 finished")); // Immediate

fs.readFile("./test-file.txt", () => {
  console.log("IO finished.");
  console.log("---------------");

  setTimeout(() => console.log("Timer 2 finished"), 0); // Expired
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setTimeout(() => console.log("Immediate 2 finished")); // Immediate
}); // IO TASK

console.log("TOP LEVEL Because not inside a callback"); // TOP LEVEL

// exec tl -> reqr -> rgstr clbk ->
