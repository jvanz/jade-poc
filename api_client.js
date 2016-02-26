var http = require("http");

var options = {
	host: 'api',
	port: 10010,
};

module.exports.get_user = () => {
	options.path = "/api/0.9.0/user";
	var data;
	http.get(options, (res) => {
		data = res.body;
		res.resume();
	}).on('error', (e) => {
		data = [];
	});
	return data;
};

module.exports.get_device = () => {
	options.path = "/api/0.9.0/device";
	var data;
	http.get(options, (res) => {
		data = JSON.parse(res.body);
		res.resume();
	}).on('error', (e) => {
		data = [];
	});
	return data;
};
