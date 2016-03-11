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
			type: "add",
			endpoint: "/edit/user",
		},
		{
			id: "edit",
			label: "Edit",
			type: "edit",
			endpoint: "/edit/user",
		},
		{
			id: "remove",
			label: "Remove",
			type: "remove",
			endpoint: "/api/0.9.0/user",
		} ];

const device_cmd_line = [
		{
			id: "add",
			label: "Add",
			type: "add",
			endpoint: "/edit/device",
		},
		{
			id: "edit",
			label: "Edit",
			type: "edit",
			endpoint: "/edit/device",
		},
		{
			id: "remove",
			label: "Remove",
			type: "remove",
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
			id: "name",
			name: "name",
			label: "Name",
			type: "text"

		},{
			id: "profile",
			name: "profile",
			label: "Profile",
			type: "text"

		},{
			id: "id",
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
			id: "type",
			name: "type:number",
			label: "Type",
			type: "number"
		},{
			id: "description",
			name: "description",
			label: "Description",
			type: "text"
		},{
			id: "ip",
			name: "ip",
			label: "IP",
			type: "text"
		},{
			id: "id",
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
		res.render("datatable", {command_line: device_cmd_line,
			table: {columns: columns, data: data,
				init_datatable: true}});
	}, () => {
		//TODO
	});
});

app.get("/users", function(req, res){
	var columns = ["id", "name", "profile"];
	api.get_user( (users) => {
		var data = convert_api_to_datatable(users, columns);
		res.render("datatable", {command_line: user_cmd_line,
			table: {columns: columns, data: data,
				init_datatable: true}});
	}, () => {
		//TODO
	});
});

app.get("/edit/user", function(req, res) {
	if (parseInt(req.query.id)){
		api.get_user( (users) => {
			user_form["data"] = users[0];
			res.render("form", {command_line: form_cmd_line,
					form: user_form });
			delete user_form["data"];
		}, () => {
			//TODO
		}, req.query.id);
	} else {
		res.render("form", {command_line: form_cmd_line,
				form: user_form });
	}
});

app.get("/edit/device", function(req, res) {
	if (parseInt(req.query.id)){
		api.get_device((devices) => {
			device_form["data"] = devices[0];
			res.render("form", {command_line: form_cmd_line,
					form: device_form });
			delete device_form["data"];
		}, () => {
			//TODO
		}, req.query.id);
	} else {
		res.render("form", {command_line: form_cmd_line,
				form: device_form });
	}
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
