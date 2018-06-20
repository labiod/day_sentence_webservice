var API_ENDPOINT = "https://b86hfjbd3e.execute-api.eu-west-2.amazonaws.com/sentence_dev"

document.getElementById("searchButton").onclick = function(){

	var sentenceId = $('#sentenceId').val();

	$.ajax({
				url: API_ENDPOINT + '?sentenceId='+ sentenceId,
				type: 'GET',
				success: function (response) {

					$('#sentences tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {
						$("#sentences").append("<tr> \
								<td>" + data['id'] + "</td> \
								<td>" + data['title'] + "</td> \
								<td>" + data['content'] + "</td> \
								<td>" + data['author'] + "</td> \
								</tr>");
	        });
				},
				error: function () {
						alert("error while posts load");
				}
		});
}

document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}
