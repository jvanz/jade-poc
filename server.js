var http = require("http");
var express = require("express");
var api = require("./api_client");
var app = express();

app.set("views", "./template");
app.set("view engine", "jade");

//default headers
var headers = [ {id: "users", name: "users", endpoint: "/users"},
	{id: "devices", name: "devices", endpoint: "/devices"}];

app.get("/", function(req, res){
	var columns = ["id", "name", "profile"];
	api.get_user( (users) => {
		var data = [];
		for (var u in users){
			var user = users[u];
			var cdata = [];
			for (var f in user){
				cdata.push(user[f]);
			}
			data.push(cdata);
		}
		res.render("index", {headers: headers, table: {columns: columns, data: data}});
	});
});

app.get("/devices", function(req, res){
	var columns = ["id", "type", "description", "ip"];
	api.get_device((devices) => {
		var data = [];
		for (var u in devices){
			var device = devices[u];
			var cdata = [];
			for (var f in device){
				cdata.push(device[f]);
			}
			data.push(cdata);
		}
		res.render("includes/datatable", {table: {columns: columns, data: data}});
	});
});

app.get("/users", function(req, res){
	var columns = ["id", "name", "profile"];
	api.get_user( (users) => {
		var data = [];
		for (var u in users){
			var user = users[u];
			var cdata = [];
			for (var f in user){
				cdata.push(user[f]);
			}
			data.push(cdata);
		}
		res.render("includes/datatable", {table: {columns: columns, data: data}});
	});
});

app.listen(80, function () {
	  console.log('Listening on port 80!');
});
