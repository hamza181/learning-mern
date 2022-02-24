const http = require("http");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  if (req.url === "/") {
    res.statusCode = 200;
    res.end("<h1>Success</h1>");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.end("<h1>About</h1>");
  } else {
    res.statusCode = 404;
    res.end("<h1>404</h1>");
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
