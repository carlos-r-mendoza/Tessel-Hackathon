var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var app = require('express')();
var path = require('path');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(1337);