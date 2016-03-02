var http = require("http");
var express = require("express");
var api = require("./api_client");
var app = express();

app.set("views", "./template");
app.set("view engine", "jade");

//default headers
const headers = [ {id: "users", name: "users", endpoint: "/users"},
	{id: "devices", name: "devices", endpoint: "/devices"}];

const user_cmd_line = [
		{
			id: "add",
			label: "Add",
			endpoint: "/add/user",
		},
		{
			id: "edit",
			label: "Edit",
			endpoint: "/edit/user",
		},
		{
			id: "remove",
			label: "Remove",
			endpoint: "/api/0.9.0/user",
		} ];

const device_cmd_line = [
		{
			id: "add",
			label: "Add",
			endpoint: "/add/device",
		},
		{
			id: "edit",
			label: "Edit",
			endpoint: "/edit/device",
		},
		{
			id: "remove",
			label: "Remove",
			endpoint: "/api/0.9.0/device",
		} ];

const form_cmd_line = [
		{
			id: "save",
			label: "Save",
		},
		{
			id: "cancel",
			label: "Cancel",
		}];

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
		res.render("index", {headers: headers, command_line: user_cmd_line,
			table: {columns: columns, data: data}});
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
		res.render("includes/datatable", {command_line: device_cmd_line,table: {columns: columns, data: data}});
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
		res.render("includes/datatable", {command_line: user_cmd_line,table: {columns: columns, data: data}});
	});
});

app.get("/edit/user", function(req, res) {
	res.render("user_form", {command_line: form_cmd_line});
});

app.get("/add/user", function(req, res) {
	res.render("user_form", {command_line: form_cmd_line});
});

app.get("/edit/device", function(req, res) {
	res.render("user_form", {command_line: form_cmd_line});
});

app.get("/add/device", function(req, res) {
	res.render("user_form", {command_line: form_cmd_line});
});

app.listen(80, function () {
	  console.log('Listening on port 80!');
});
