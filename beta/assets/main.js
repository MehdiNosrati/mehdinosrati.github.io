$(document).ready(function () {
	// Add smooth scrolling to all links
	$("a").on('click', function (event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body, .laptop-content').animate({
				scrollTop: $(hash).offset().top
			}, 800, function () {

				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
		} // End if
	});
});


if (screen.availWidth <= 1200) {
	$('.laptop-pic').attr("src", "assets/ipad.png");
	$('.laptop-pic').css('width', '900px');
	$('.laptop-pic').css('top', '10px');
	$('.laptop-content').css('height', '1000px');
	$('.laptop-content').css('top', '165px');
	$('.laptop-content').css('width', '810px');
	$('.laptop-content').css('transform', 'translate(-50%,0)');
	$('.intro').css('background', "#C5CAE9");
	

}
window.onresize = function(){
	location.reload(true);
}
