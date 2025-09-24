// We need to read a large file from the server and then send it to a client

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  // Problem with sol1 node will run out of resources real quick
  //});
  // Solution 2: Streams

  //   const readable = fs.createReadStream("test-file.txt");

  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   readable.on("end", () => {
  //     res.end();
  //   });

  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not Found!");
  // }); // Readable stream from disk is much much faster than the speed of us sending it via response making Back Pressure

  // Solution 3:
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writeableDest)
});

//

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests..");
});
