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
			endpoint: "/edit/user",
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
			endpoint: "/edit/device",
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

const user_form_field = [
	{
		name: "name",
		label: "Name"
	},
	{
		name: "profile",
		label: "Profile"
	}];

const device_form_field = [
	{
		name: "type",
		label: "Type"
	},
	{
		name: "description",
		label: "Description"
	},
	{
		name: "ip",
		label: "IP"
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
		res.render("includes/datatable", {command_line: user_cmd_line,
			table: {columns: columns, data: data}});
	});
});

app.get("/edit/user", function(req, res) {
	res.render("form", {command_line: form_cmd_line,
			form_fields: user_form_field});
});

app.get("/edit/device", function(req, res) {
	res.render("form", {command_line: form_cmd_line,
			form_fields: device_form_field});
});

app.listen(80, function () {
	  console.log('Listening on port 80!');
});
