/* To build a very simple server we will need theser three modules:
http: allows us to use the http server/client
path: The path module provides utilities for working with file and directory paths. 
fs: The fs module provides an API for interacting with the file system.
*/

const http = require("http");
const path = require("path");
const fs = require("fs");

let counter = 0;

// http.createServer([options][, requestListener])
// more infos: https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_http_createserver_options_requestlistener
const server = http.createServer((req, res) => {
  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  console.log(filePath);

  // Extension of file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check ext and set content type: used to handle other datatypes! It is important, if not,
  // the page will not load correctly!
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".svg":
      contentType = "image/svg+xml";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Read File
  fs.readFile(filePath, (err, content) => {
    // handle errors
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        // Another server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      //if everything occurs fine:
      //check if a file exists
      fs.exists(path.join(__dirname, "public", "table (1).json"), exists => {
        if (exists) {
          console.log("yes!");
          // try {
          //   fs.unlinkSync(path.join(__dirname, "public", "table.json"));
          // } catch (err) {
          //   console.log("Error, while deleting the file" + err);
          // }
          try {
            fs.renameSync(
              path.join(__dirname, "public", "table (1).json"),
              path.join(__dirname, "public", "table.json")
            );
          } catch (err) {
            console.log("Error, while renaming the file" + err);
          }
          //get the total number of files in storage folder
          fs.readdir(path.join(__dirname, "public/storage"), (err, files) => {
            counter = files.length + 1;
            console.log(counter);
            //copy the file to storage for backup reasons!
            fs.copyFile(
              path.join(__dirname, "public", "table.json"),
              // path.join(__dirname, "public/storage", "table.json"),
              path.join(__dirname, "public/storage", `table${counter}.json`),
              err => {
                if (err) throw err;
                console.log("table.json was copied to storage folder!");
              }
            );
          });
        }
      });

      // success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

// get the port availabe or 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
