$.postJSON = function(url, data, callback) {
	return jQuery.ajax({
		'type': 'POST',
		'url': url,
		'contentType': 'application/json',
		'data': JSON.stringify(data),
		'success': callback
	});
};

function open_header(header_id, endpoint){
	$.get(endpoint, function (data) {
		$("#content").html(data);
	});
}

function command(endpoint){
	$.get(endpoint, function (data) {
		$("#content").html(data);
	});
}

function form_action(type, endpoint){
	if ("save" === type){
		$.postJSON(endpoint, $("#form").serializeJSON(),
			function(data){
				console.log("form submitted!");
			});
	} else if ("cancel" === type){
		$.get(endpoint, function (data) {
			$("#content").html(data);
		});
	} else {
		console.log("unknown form action");
	}
}
