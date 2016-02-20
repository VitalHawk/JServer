var http = require('http');
var util = require('util');
var url = require('url');
var fs = require('fs');

var server = new http.createServer(
        function(req, res) {
            var p_url = url.parse(req.url, true);
            var fname = p_url.pathname;

            if ('/data' === fname)
                return res.end('Result from the server: ' + p_url.query.inp.toUpperCase());
            else if ('/processdata' === fname)
                return res.end(p_url.query.data.split("").reverse().join(""));

            fs.readFile('public' + (fname === '/' ? '/index.html' : fname), 'utf8', 
                function(err, data) { 
                    res.end(err ? util.inspect(err) : data);
                }
                        );
        });
        
server.start = function() {
    server.listen(9090);
};

module.exports = server;
        
//require('http').createServer(function(req, res) { res.end('Hello, vit'); }).listen(9090);
