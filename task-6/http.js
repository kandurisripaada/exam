const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to Home Page</h1>");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is a plain text About Page.");
  } else if (req.url === "/user") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const user = { name: "Alice", age: 25 };
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("HTTP Server running at http://localhost:3000");
});
