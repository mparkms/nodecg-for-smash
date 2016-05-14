'use strict';

$(function() {
	nodecg.listenFor('ssbmPlayercam', updateLabel);

	function updateLabel(data) {
		$('#container').animate({top: "-100%"}, {duration: 1000, complete: function() {
			$('#text').text(data);
		}});
		$('#container').animate({top: "0%"}, 1000);
	}

	var bgInfo = nodecg.Replicant('bgInfo', 'ssbm-bg-helper');

	bgInfo.on('change', function(oldValue, newValue) {
		if(oldValue) {
			if(oldValue.image && newValue.image) return;
			else if (newValue.image) {
				$('#container').css('background', 'none');
				$('#container').css('background-image', 'url("img/playercam.png")');
			} else {
				$('#container').css('background-image', 'none');
				$('#container').css('background', '#' + newValue.color);
				$('#container').css('border-radius', newValue.corner + 'px')
			}
		}
	});
});