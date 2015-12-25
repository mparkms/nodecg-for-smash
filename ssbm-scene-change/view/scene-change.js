'use strict';

$(function () {
	nodecg.listenFor('ssbmDropIn', dropIn);
	nodecg.listenFor('ssbmDropOut', dropOut);

	var numSlices = 8;

	$.ionSound({
		sounds: [
			'transitionin',
			'transitionout'
		],
		path: 'audio/',
		multiPlay: true,
		volume: '0.15'
	});

	function dropInit() {
		$('#shuttercontainer').html('');
		for (var i = 1; i <= numSlices; i++) {
			$('#shuttercontainer').append('<div id="shutter' + i + '" class="shutter"><img src="img/logo_slices/logo_slice' + i + '.png"></div>');
			var bgGradient = shadeColor("#d52134", -15 * (numSlices - i + 1));
			$('#shutter' + i).css({
			  'left': (1 / numSlices) * (i - 1) * 100 + "%",
			  'background-color': shadeColor("#d52134", -15 * i), //light to dark
			  //'background-image': '-webkit-linear-gradient(top, rgba(255,205,40,0) 10%, ' + bgGradient +' 99%)'
			});
		}
	}

	function dropIn() {
		dropInit();

		$.ionSound.play('transitionin');
		for (var i = 1; i <= numSlices; i++) {
        	$('#shutter' + i).delay((i - 1) * 50).animate({
            	'top': '0%',
            	'background-position-y': '0px'
        	}, 400);
      	}
	}

	function dropOut() {
		$.ionSound.play('transitionout');
		for (var i = numSlices; i >= 1; i--) {
			$('#shutter' + i).delay(Math.abs(i - numSlices) * 50).animate({
				'top': '100%',
				'background-position-y': '7200px'
			}, 400);
		}
	}
	
	function shadeColor (color, shade) {
		var colorInt = parseInt(color.substring(1), 16);

		var R = (colorInt & 0xFF0000) >> 16;
		var G = (colorInt & 0x00FF00) >> 8;
		var B = (colorInt & 0x0000FF) >> 0;

		R = R + Math.floor((shade / 255) * R);
		G = G + Math.floor((shade / 255) * G);
		B = B + Math.floor((shade / 255) * B);

		var newColorInt = (R << 16) + (G << 8) + (B);
		var newColorStr = newColorInt.toString(16);
		    
		return newColorStr;
	}
})