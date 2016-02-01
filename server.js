var http = require("http");

const PORT = 8080;

function handle_request(request, response){
	response.end("It works! Path hit:" + request.url);
}

var server = http.createServer(handle_request);
server.listen(PORT, function(){
	console.log("Server listening on http://localhost:%d",PORT);
});
