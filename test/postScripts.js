var API_ENDPOINT = "https://b86hfjbd3e.execute-api.eu-west-2.amazonaws.com/sentence_dev"
$(document).ready(function() {
    $("#sendButton").click(function(){

        var inputData = {
            "title": $('#sentenceTitle').val(),
            "content" : $('#sentenceContent').val(),
            "author" : $('#sentenceAuthor').val()
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
