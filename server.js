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

const user_form ={
	actions: [{
			type: "save",
			label: "Save",
			endpoint: "/api/0.9.0/user"
		},{
			type: "cancel",
			label: "Cancel",
			endpoint: "/users"
		}],
	fields: [{
			name: "name",
			label: "Name",
			type: "text"

		},{
			name: "profile",
			label: "Profile",
			type: "text"

		},{
			name: "id:number",
			type: "hidden"
		}]
};

const device_form ={
	actions: [{
			type: "save",
			label: "Save",
			endpoint: "/api/0.9.0/device"
		},{
			type: "cancel",
			label: "Cancel",
			endpoint: "/devices"
		}],
	fields: [{
			name: "type:number",
			label: "Type",
			type: "number"
		},{
			name: "description",
			label: "Description",
			type: "text"
		},{
			name: "ip",
			label: "IP",
			type: "text"
		},{
			name: "id:number",
			type: "hidden"
		}]
}

app.get("/", function(req, res){
	var columns = ["id", "name", "profile"];
	api.get_user((users) => {
		var data = convert_api_to_datatable(users, columns);
		res.render("index", {headers: headers, command_line: user_cmd_line,
			table: {columns: columns, data: data,
				init_datatable: false}});
	}, () => {
		res.render("index", {headers: headers, command_line: user_cmd_line,
			table: {columns: columns, init_datatable: false}});
	});
});

app.get("/devices", function(req, res){
	var columns = ["id", "type", "description", "ip"];
	api.get_device((devices) => {
		var data = convert_api_to_datatable(devices, columns);
		res.render("includes/datatable", {command_line: device_cmd_line,
			table: {columns: columns, data: data,
				init_datatable: true}});
	}, () => {

	});
});

app.get("/users", function(req, res){
	var columns = ["id", "name", "profile"];
	api.get_user( (users) => {
		var data = convert_api_to_datatable(users, columns);
		res.render("includes/datatable", {command_line: user_cmd_line,
			table: {columns: columns, data: data,
				init_datatable: true}});
	}, () => {

	});
});

app.get("/edit/user", function(req, res) {
	res.render("form", {command_line: form_cmd_line,
			form: user_form });
});

app.get("/edit/device", function(req, res) {
	res.render("form", {command_line: form_cmd_line,
			form: device_form });
});

app.listen(80, function () {
	  console.log('Listening on port 80!');
});

function convert_api_to_datatable(api_data, columns){
	var data = [];
	for (var u in api_data){
		var entity = api_data[u];
		var cdata = [];
		for (var c in columns){
			cdata.push(entity[columns[c]]);
		}
		data.push(cdata);
	}
	return data;
}
