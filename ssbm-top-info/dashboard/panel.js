'use strict';

var $panel = $bundle.filter('.ssbm-top-info');

var $update = $panel.find('.ssbm-top-update');
var $update_anim = $panel.find('.ssbm-top-update-anim');

$update.click(function() {
	nodecg.sendMessage('ssbmTopUpdate', updateData(false));
});

$update_anim.click(function() {
	nodecg.sendMessage('ssbmTopUpdate', updateData(true));
});

function updateData(anim) {
	return {
		'panel1text': $('#ssbm-top-panel1text').val(),
		'panel2text': $('#ssbm-top-panel2text').val(),
		'width': $('#ssbm-top-width').val(),
		'spacing': $('#ssbm-top-spacing').val(),
		'anim': anim
	};
}