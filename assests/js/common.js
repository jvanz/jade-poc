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

function command(command, endpoint){
	if ("remove" === command){
		var id = $("#table").DataTable().row(".selected").data()[0];
		$.ajax({
			method: "DELETE",
			url: endpoint + "?id=" + id,
		}).fail(function(){
			console.log("delete command failed");
		}).done(function(){
			console.log("delete command succeed");
			table.row(".selected").remove().draw(false);
		});
	} else if ("edit" === command){

	} else if ("add" === command){
		$.get(endpoint, function (data) {
			$("#content").html(data);
		});
	} else {
		console.log("unknown command");
	}
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

function init_datatable(){
	table = $("#table").DataTable();
	$("#table tbody").on("click", "tr", function(){
		if ( $(this).hasClass('selected') ) {
			$(this).removeClass('selected');
		} else {
			table.$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
		}
	});
}
