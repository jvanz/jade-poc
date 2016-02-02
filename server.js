var http = require("http");
var jade = require("jade");

const PORT = 8080;

var index = jade.compileFile("template/index.jade");

function handle_request(request, response){
	console.log("Hit path:", request.url);
	headers = ["users", "users","users","users","users","users"];
	response.end(index({headers: headers}));
}

var server = http.createServer(handle_request);
server.listen(PORT, function(){
	console.log("Server listening on http://localhost:%d",PORT);
});
