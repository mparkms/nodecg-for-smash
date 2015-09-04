'use strict';

$(function() {
	nodecg.listenFor('ssbmPlayercam', updateLabel);

	function updateLabel(data) {
		$('#container').animate({top: "100%"}, {duration: 1000, complete: function() {
			$('#text').text(data);
		}});
		$('#container').animate({top: "0%"}, 1000);
	}
});