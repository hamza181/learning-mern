const fs = require("fs");

let content = "Hello World";

// Write content to file

fs.writeFile("hello.txt", content, (err) => {
  if (err) {
    throw err;
  }
  console.log("File saved!");
});

// Read content from file

fs.readFile("hello.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data.toString());
});

