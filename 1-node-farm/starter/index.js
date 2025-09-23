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
// WEB SERVER and URL ROUTING

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// const dataObj = JSON.parse(data);

// const server = http.createServer((req, res) => {
//   const pathWay = req.url;

// if (pathWay === "/overview" || pathWay === "/") {
//   res.end("This is the OVERVIEW");
// } else if (pathWay === "/product") {
//   res.end("This is the PRODUCT");
// } else if (pathWay === "/api") {
//   // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
//   //   const product_data = JSON.parse(data);
//   //   console.log(product_data);
//   //   res.writeHead(200, { "Content-type": "application/json" });
//   //   res.end(data);
//   // }); // Inefficient

//   res.end(data);
// } else {
//   res.writeHead(404, {
//     "Content-type": "text/html",
//     "my-own-header": "micron",
//   });
//   res.end("<h1>Page not found!!</h1>");
// }
//   // Sending back a plain text simple response.
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Server Has Started listening to req ons port 127.0.0.1:8000");
// }); // Listen to requests on Port(8000), IP(127.0.0.1 localhost), callback that executes when listen is executed

///////////////////////////
// Building and deploying a website:

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

// Starting Server
const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(url.parse());

  const pathWay = req.url;

  // Rendering stuff

  // Overview
  if (pathWay === "/overview" || pathWay === "/") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const cardsHTML = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(",");

    const newOverview = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHTML);
    res.end(newOverview);
  }

  // Product Page
  else if (pathWay === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    res.end(tempProduct);
  }

  // API
  else if (pathWay === "/api") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
  }

  // Not found
  else {
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end("<h1>Page not found!!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server started 127.0.0.1:8000");
});
