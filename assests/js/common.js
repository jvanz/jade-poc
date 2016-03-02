
function open_header(header_id, endpoint){
	$.get(endpoint, function (data) {
		$("#content").html(data);
		$("#table").DataTable();
	});
}

function command(endpoint){
	$.get(endpoint, function (data) {
		$("#content").html(data);
	});
}
