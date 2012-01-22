var http = require('http')
var requests = {};

var context = require('zeromq');
var publisher = context.createSocket('push');

publisher.bind("tcp://*:5555")

var requests = [];

for(var i = 0; i < 100; i++) {

	var options = {
		host: 'localhost',
		port: 80,
		path: '/index.php'
	};

	http.get(options, function(res) {
		var data = '';
		res.on('data',  function(chunk){
			data += chunk;
		});
		res.on('end', function() {
			var guid = res.headers['x-guid'];
			requests[guid](data);
			delete requests[guid];
		});
	}).on('error', function(e) {
		console.log('error: ' + e.message);
	});

}


http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });

	if(req.url.indexOf("/index.php") === 0) {

		var guid = Math.round(Math.random()*1000000000); 
		publisher.send(guid);
		requests[guid] = function(data) {
			res.write(data);
			res.end();
		}
	} else {
		res.end();
	}
}).listen(8080);


process.on('SIGINT', function() {
  requester.close()
})
