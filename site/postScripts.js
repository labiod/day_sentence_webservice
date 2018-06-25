var API_ENDPOINT = "https://b86hfjbd3e.execute-api.eu-west-2.amazonaws.com/sentence_dev"
var API_CAT_ENDPOINT = API_ENDPOINT + "/category"

$(document).ready(function() {
    $.ajax({
        url: API_CAT_ENDPOINT,
        type: 'GET',
        success: function (response) {
            $.each(response, function () {
                $('#sentenceCategory').append($('<option>', { 
                    text: this.name,
                    value: this.id
                }));
            });
        },
        error: function () {
                alert("error while posts load");
        }
    });

    $("#sendButton").click(function(){

        var inputData = {
            "title": $('#sentenceTitle').val(),
            "content" : $('#sentenceContent').val(),
            "author" : $('#sentenceAuthor').val(),
            "category" : $('#sentenceCategory').val()
        };
    
        $.ajax({
              url: API_ENDPOINT,
              type: 'POST',
              data:  JSON.stringify(inputData)  ,
              contentType: 'application/json; charset=utf-8',
              success: function (response) {
                        $("#postIDreturned").html("Post ID: " + response)
              },
              error: function () {
                  alert("error when adding new post");
              }
          });
    })
    
    $("#sentenceContent").keydown(function(){
        var length = $(sentenceContent).val().length;
        $("#charCounter").html("Characters: " + length)
    })
})
