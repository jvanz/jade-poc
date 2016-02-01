var http = require("http");
var jade = require("jade");

const PORT = 8080;

var index = jade.compileFile("template/index.jade");

function handle_request(request, response){
	response.end(index());
}

var server = http.createServer(handle_request);
server.listen(PORT, function(){
	console.log("Server listening on http://localhost:%d",PORT);
});
