'use strict';

$(function () {
	nodecg.listenFor('ssbmTopUpdate', updatePanels);

	function updatePanels(data) {
		if(data.anim) {
			updatePanelsAnim(data);
		}
		else {
			updateText(data);
			updateWidthSpacing(data);
		}
	}

	function updatePanelsAnim(data) {
		$('.panel').animate({top: "-100%"}, {duration: 1000, complete: function () { updateText(data); }});
		$('.panel').animate({top: "0%"}, {duration: 1000, complete: function () { updateWidthSpacing(data) }});
	}

	function updateText(data) {
		$('#panel1').text(data.panel1text);
		$('#panel2').text(data.panel2text);
	}

	function updateWidthSpacing(data) {
		$('.panel').animate({width: data.width + "px"}, 1000);
		$('#spacing').animate({width: data.spacing + "px"}, 1000);
	}
})