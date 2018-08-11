var gifholder = ['Futurama', 'Fry', 'Jurassic Bark', 'Hypno Toad'];

// ========================================================

function getGIF() {

	var gif = $(this).attr('data-name');
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function (response) {
		console.log(response);
		$("#gifView").empty();
		for (var i = 0; i < response.data.length; i++) {

			var rating = response.data[i].rating;
			var imageUrl = response.data[i].images.fixed_height.url;
			var imageStillUrl = response.data[i].images.fixed_height_still.url;

			var image = $("<img>");
			var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");


			image.attr('src', imageStillUrl);
			image.attr('alt', 'gif');
			image.attr('data-state', 'still');
			image.attr('data-still', imageStillUrl);
			image.attr('data-animate', imageUrl);


			$('#gifView').prepend(image, ratingText);
			checkState();
		}
	});
}

function makeButtons() {

	$('#buttonsView').empty();

	for (var i = 0; i < gifholder.length; i++) {

		var newButton = $('<button class="btn btn-danger">')
		newButton.addClass('giftastic');
		newButton.attr('data-name', gifholder[i]);
		newButton.text(gifholder[i]);
		$('#buttonsView').append(newButton);
	}
}

$('#addGIF').on('click', function () {

	var gifplace = $('#gif-imput').val().trim();

	gifholder.push(gifplace);

	makeButtons();

	return false;
})


$(document).on('click', '.giftastic', getGIF);

makeButtons();

function checkState() {
	$('img').on('click', function () {
		var state = $(this).attr('data-state');
		if (state == 'still') {
			$(this).attr('src', $(this).data('animate'));
			$(this).attr('data-state', 'animate');
		} else {
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
		}

	});
};