var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

app.use(express.static(__dirname + '/public'));

app.post('/', function(req, res) {
    console.log('post received');
    console.log(req.body);
    res.send('hi there');
});

app.get('/', function (req, res) {
    console.log(__dirname + '/public/index.html');
    res.sendFile(__dirname + '/index.html');
});

app.listen(8000, '10.40.104.111', function () {
    console.log(__dirname + "/public/bundle.js");
    console.log('Example app listening on port 3000!');
});


//function init() {
//
//}