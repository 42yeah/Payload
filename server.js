const http = require("http");
const fs = require("fs");
const serveStatic = require("serve-static");
const multiparty = require("multiparty");

const staticFiles = serveStatic(".");

http.createServer(function(req, res) {
  if (req.url == "/files") {
    listFiles(res);
  } else if (req.url == "/file-upload") {
    saveFile(req, res);
  } else if (req.url == "/delete-everything") {
    deleteEverything(res);
  } else {
    serveFile(req, res);
  } /* else {
    res.writeHead(404);
    res.end();
  } */
}).listen(23123);

function listFiles(res) {
  res.writeHead(200, {
    "Content-Type": "text/json",
    "Access-Control-Allow-Origin": "*"
  });
  fs.readdir("assets", function(err, items) {
    if (err) {
      console.log(err);
    }
    let curatedFiles = [];
    for (let i = 0; i < items.length; i++) {
      const fileName = items[i];
      const { birthtime, size } = fs.statSync("assets/" + fileName);
      curatedFiles.push({
        size: size,
        fileName: fileName,
        cakeDate: birthtime
      });
    }
    res.write(JSON.stringify(curatedFiles));
    res.end();
  });
}

function deleteEverything(res) {
  res.writeHead(200, {
    "Content-Type": "text/json",
    "Access-Control-Allow-Origin": "*"
  });
  fs.readdir("assets", function(err, items) {
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < items.length; i++) {
      fs.unlinkSync("assets/" + items[i]);
    }
    res.write(JSON.stringify({
      OK: 200
    }));
    res.end();
  });

}

function serveFile(req, res) {
  const fileName = req.url.substr(8);
  console.log("Serving " + req.url);
  // req.url = fileName;
  staticFiles(req, res, function() {
    res.end();
  });
}

function saveFile(req, res) {
  let form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err);
      res.writeHead(502);
      res.end();
      return;
    }
    const file = files.file[0];
    fs.rename(file.path, "assets/" + file.originalFilename, function(err) {
      if (err) {
        console.log(err);
        res.writeHead(502);
        res.end();
        return;
      }
      res.writeHead(200, {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*"
      });
      res.write(JSON.stringify({
        OK: 200
      }));
      res.end();
    });
  });
}
