"use strict";

let express = require("express");
let app = express();

app.use(express.static(__dirname + "/static"));

app.get('/*', function(req, res) {
    res.header("Cache-Control", "max-age=86400");
    res.sendfile("static/index.html");
});

let port = process.env.PORT || 5000;
app.listen(port);
console.log("Server works on port " + port);
console.log("------------------------------------");
