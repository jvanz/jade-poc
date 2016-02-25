var http = require("http");
var jade = require("jade");

const PORT = 8080;

var index = jade.compileFile("template/index.jade");

function handle_request(request, response){
	console.log("Hit path:", request.url);
	headers = ["users", "users","users","users","users","users"];
	user_columns = ["id", "name", "profile"];
	response.end(index({headers: headers, table: {columns: user_columns}}));
}

var server = http.createServer(handle_request);
server.listen(PORT, function(){
	console.log("Server listening on http://0.0.0.0:%d",PORT);
});
