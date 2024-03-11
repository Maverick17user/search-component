"strict mode";

var serveStatic = require("serve-static");
var express = require("express");
var Trie = require("trie-search");
var path = require("path");
var fs = require("fs");

var app = express();
var search = new Trie("street");

var file = fs.readFile("./data/adresses.json", "utf-8", function (error, data) {
  var adresses = JSON.parse(data);
  adresses.forEach((address) => search.add(address));
  console.log("Indexing done - search can now be performed");
});

app.get("/search/:query", function (req, res, next) {
  var result = req.params.query.length >= 3 ? search.get(req.params.query) : [];
  res.status(200).json(result.slice(0, 20));
});

app.use("/", serveStatic(path.resolve(__dirname, "../static/")));

app.listen(8080, function () {
  console.log("http server running at http://localhost:8080/");
});
