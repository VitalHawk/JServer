var http = require('http');
var util = require('util');
var url = require('url');
var fs = require('fs');

var server = new http.createServer(
        function(req, res) {
            //req.
            //console.log(req);
            //console.log(res);
            var p_url = url.parse(req.url, true);

            var fname = p_url.pathname;
            
            if ('/data' == fname) {
                res.end('Result from the server: ' + p_url.query.inp.toUpperCase());
                return;
            }
            
            if ('/processdata' == fname) {
                res.end(p_url.query.data.split("").reverse().join(""));
                return;
            }
            
            fs.readFile('public' + fname, 'utf8', 
                function(err, data) { 
                    if (err)
                        res.end(util.inspect(err));
                    else
                        res.end(data);
                }
                        );
            //res.end( util.inspect(url.parse(req.url, true)) );
        });
        
server.start = function() {
    server.listen(9090);
};

module.exports = server;
        
//server.listen(9090);
//

//require('http').createServer(function(req, res) { res.end('Hello, vit'); }).listen(9090);
