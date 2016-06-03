var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    console.log(__dirname + '/public/index.html');
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log(__dirname + "/public/bundle.js");
    console.log('Example app listening on port 3000!');
});