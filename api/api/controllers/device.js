'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  device_info: device_info
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */

var devices = [
	{
		id: 1232145,
		type: 0,
		description: "device 0",
		ip: "127.0.0.1"
	},
	{
		id: 9898,
		type: 0,
		description: "device",
		ip: "127.0.0.1"
	},
	{
		id: 98361561,
		type: 1,
		description: "device",
		ip: "127.0.0.1"
	},
	{
		id: 5124423,
		type: 2,
		description: "device",
		ip: "127.0.0.1"
	},
	{
		id: 129821,
		type: 3,
		description: "device",
		ip: "127.0.0.1"
	}
]

function device_info(req, res) {
	if(Object.keys(req.query).length === 0) {
  		res.json(devices);
	} else {
		var return_dev = [];
		console.log(JSON.stringify(req.query));
		for( var i in devices){
			var dev = devices[i];
			if(dev.type === parseInt(req.query.type))
				return_dev.push(dev);
			else if(dev.id === parseInt(req.query.id ))
				return_dev.push(dev);
		}
		// this sends back a JSON response which is a single string
		res.json(return_dev);
	}
}
