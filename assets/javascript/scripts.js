// You will need to fill in apiKey for this to work
var apiKey = "";
var gifs = ["lady gaga", "gwen stefani", "kristen bell", "taylor swift"];

function gifDisplay() {
  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=" + apiKey + "&limit=10";

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#gifs-display").empty();
    console.log(queryURL);
    console.log(response);
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var storage = $("<div>")
      var rating = $("<p>").text("Rating: " + results[i].rating);
      var gifImage = $("<img>");

      gifImage.attr("src", results[i].images.fixed_height.url);
      gifImage.attr("data-state", "animate");
      gifImage.attr("data-animate", results[i].images.fixed_height.url);
      gifImage.attr("data-still", results[i].images.fixed_height_still.url);

      gifImage.on("click", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

      storage.append(gifImage);
      storage.append(rating);
      $("#gifs-display").append(storage);
    }
  });

}

function renderButtons() {
  $("#buttons-display").empty();
  for (var i = 0; i < gifs.length; i++) {
    var a = $("<button>");
    a.addClass("mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent")
    a.addClass("gif");
    a.attr("data-name", gifs[i]);
    a.text(gifs[i]);
    $("#buttons-display").append(a);
  }
}

$("#add-gif").on("click", function (event) {
  event.preventDefault();
  var gif = $("#gif-input").val().trim();
  if (gif !== "") {
    gifs.push(gif);
  }
  renderButtons();
});

$(document).on("click", ".gif", gifDisplay);

renderButtons();