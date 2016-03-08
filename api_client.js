var http = require("http");

var options = {
	host: 'api',
	port: '10010'
};

module.exports.get_user = (success, error) => {
	options.path = "/api/0.9.0/user";
	http.get(options, (res) => {
		var data = "";
		res.on("data", (chunk) => {
			data += chunk;
		});
		res.on("end", () => {
			success(JSON.parse(data));
		});
	}).on('error', (e) => {
		  console.log("problem with request: " + e.message);
		  error();
	});
};

module.exports.get_device = (success, error) => {
	options.path = "/api/0.9.0/device";
	http.get(options, (res) => {
		var data = "";
		res.on("data", (chunk) => {
			data += chunk;
		});
		res.on("end", () => {
			success(JSON.parse(data));
		});
	}).on('error', (e) => {
		  console.log("problem with request: " + e.message);
		  error();
	});
};
