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
  get_user: get,
  add_user: add,
  delete_user: delete_user
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */

var users = [];
for(var i = 0; i < 100; ++i){
	users.push({
		id: i,
		name: "name-" + i,
		profile: "profile"
	});
}

function get(req, res) {
	if(Object.keys(req.query).length === 0) {
  		res.json(users);
	} else {
		var return_user = [];
		for( var i in users){
			var user = users[i];
			if(user.id === parseInt(req.query.id ))
				return_user.push(user);
		}
		// this sends back a JSON response which is a single string
		res.json(return_user);
	}
}

function add(req, res){
	var data = req.body;
	if (data.id){
		for( var i in users){
			var user = users[i];
			if (user.id === data.id){
				users[i] = data;
				break;
			}
		}
		res.status(200).end();
	} else {
		data.id = users.length;
		users.push(data);
		res.status(200).end();
	}
}

function delete_user(req, res){
	if(Object.keys(req.query).length === 0) {
		res.status(400).end();
	} else {
		for( var i in users){
			var user = users[i];
			if(user.id === parseInt(req.query.id )){
				users.splice(i, 1);
				res.status(200).end();
			}
		}
	}
	res.status(400).end();
}
