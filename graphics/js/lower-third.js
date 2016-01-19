'use strict';

$(function () {
	nodecg.listenFor('lowerThirdUpdate', update);
	nodecg.listenFor('lowerThirdUpdateAnim', updateAnim);

	function update(data) {
		$('#lowerthirdtoptext').text(data.top);
		$('#lowerthirdbottomtext').text(data.bottom);
	}

	function updateAnim(data) {
		$('#lowerthirdcontainer').animate({left: "-100%"}, {duration: 800, complete: function() {
			update(data);
		}});
		$('#lowerthirdcontainer').animate({left: "0%"}, 800);
	}
});