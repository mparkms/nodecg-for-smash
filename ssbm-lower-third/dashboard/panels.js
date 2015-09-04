'use strict';

var $panel = $bundle.filter('.ssbm-lower-third');

var $update = $panel.find('.ssbm-third-update');
var $updateAnim = $panel.find('.ssbm-third-update-anim');

$update.click(function() {
	nodecg.sendMessage('lowerThirdUpdate', updateData());
});

$updateAnim.click(function() {
	nodecg.sendMessage('lowerThirdUpdateAnim', updateData());
});

function updateData() {
	return {
		'top': $('#ssbm-third-top-text').val(),
		'bottom': $('#ssbm-third-bottom-text').val()
	}
}