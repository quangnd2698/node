var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
  fs.appendFile('mynewfile1.txt', 'Hello content 1111111!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  fs.open('mynewfile2.txt', 'w', function (err, file) {
    if (err) throw err;
    console.log('Saved!');
  });
  fs.writeFile('mynewfile3.txt', 'Hello content!12', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}).listen(8080);