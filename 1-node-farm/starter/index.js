const fs = require("fs");
const http = require("http");
const url = require("url");

//////////////////////////////////
// FILES

// console.log("hello");
// const textIn = fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
//   console.log(err, data);
//   return data;
// });
// console.log(textIn);
// const textOut = `${textIn}\n### Modiefied on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log(fs.readFileSync("./txt/output.txt", "utf-8"));

// Non Blocking async:
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("File Written...");
//       });
//     });
//   });
// });

/////////////////////////////////////
// WEB SERVER

const server = http.createServer((req, res) => {
  const pathWay = req.url;

  if (pathWay === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathWay === "/product") {
    res.end("This is the PRODUCT");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found!!</h1>");
  }
  // Sending back a plain text simple response.
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server Has Started listening to req ons port 127.0.0.1:8000");
}); // Listen to requests on Port(8000), IP(127.0.0.1 localhost), callback that executes when listen is executed

///////////////////////////
// Url routing
