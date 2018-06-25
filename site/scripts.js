var API_ENDPOINT = "https://b86hfjbd3e.execute-api.eu-west-2.amazonaws.com/sentence_dev"

$(document).ready(function() {
	$.ajax({
		url: API_ENDPOINT,
		type: 'GET',
		success: function (response) {

			$('#sentences tr').slice(1).remove();

			jQuery.each(response, function(i,data) {
				$("#sentences").append("<tr> \
						<td>" + data['id'] + "</td> \
						<td>" + data['title'] + "</td> \
						<td>" + data['content'] + "</td> \
						<td>" + data['author'] + "</td> \
						<td>" + data['category'] + "</td> \
						<td><input id='deleteId_" + data['id'] + "' class='deleteButton' type='button' value='Delete' /></td> \
						</tr>");
			})
			$(".deleteButton").click(function() {
			
				sendDeleteAction(this.id.split("_")[1])
			});
		},
		error: function () {
				alert("error while posts load");
		}
});
})

function sendDeleteAction(id) {
	alert(id)
	$(document).ready(function() {
		$.ajax({
			url: API_ENDPOINT + "/" + id,
			type: 'DELETE',
			dataType: 'JSON',
			success: function (response) {
				alert("OK")
				//alert(response)
			},
			error: function () {
					alert("error while delete sentence");
			}
	});
	})
}

