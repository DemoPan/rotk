var http = require("http");
var fs = require("fs");

function getJson(res) {
  fs.readFile("./title.json", function(err, data) {
    if (err) {
      return getError(err, res);
    }
    getTmpl(data, res);
  });
}

function getTmpl(data, res) {
  var titles = JSON.parse(data.toString());

  fs.readFile("ex1.html", function(err, data) {
    if (err) {
      return getError(err, res);
    }
    getHTML(titles, data, res);
  });
}

function getHTML(titles, data, res) {
  var tmpl = data.toString();
  var html = tmpl.replace("%", titles.join("</li><li>"));
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

function getError(err, res) {
  console.error(err);
  res.end("Server Error");
}
http
  .createServer(function(req, res) {
    if (req.url == "/") {
      getJson(res);
    }
  })
  .listen(8000, "127.0.0.1");
