'use strict';

$(function() {
	nodecg.listenFor('ssbmAlert', showAlert);

	$.ionSound({
		sounds: [
			'alertopen',
			'alertclose'
		],
		path: 'audio/',
		multiPlay: true,
		volume: '0.15'
	});

	function showAlert(data) {
		if(data.type == 'Custom') {
			$('#title').text(data.custom);
		} else {
			$('#title').text(data.type);
		}
		$('#message').text(data.message);
		$.ionSound.play('alertopen');
		$('#container').animate({left: "5px"}, 800);
		setTimeout(hideAlert, 10000);
	}

	function hideAlert(data) {
		$.ionSound.play('alertclose');
		$('#container').animate({left: "110%"});
	}
})