'use strict';

var $panel = $bundle.filter('.ssbm-top-info');

var $update = $panel.find('.ssbm-top-update');
var $update_anim = $panel.find('.ssbm-top-update-anim');
var $send_message = $panel.find('.ssbm-top-message');

$update.click(function() {
	nodecg.sendMessage('ssbmTopUpdate', updateData(false));
});

$update_anim.click(function() {
	nodecg.sendMessage('ssbmTopUpdate', updateData(true));
});

$send_message.click(function() {
	nodecg.sendMessage('ssbmTopMessage', $panel.find('#ssbm-message-text').val());
})

function updateData(anim) {
	return {
		'panel1text': $('#ssbm-top-panel1text').val(),
		'panel2text': $('#ssbm-top-panel2text').val(),
		'anim': anim
	};
}