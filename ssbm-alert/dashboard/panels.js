'use strict';

var $panel = $bundle.filter('.ssbm-alert');

var $send = $panel.find('.ssbm-alert-send');
var $type = $('#ssbm-alert-type');
var $custom = $('#ssbm-alert-custom');

$send.click(function() {
	nodecg.sendMessage('ssbmAlert', messageData());
});

$type.change(function() {
	if($type.val() == 'Custom') {
		$custom.removeAttr('disabled');
	} else {
		$custom.attr('disabled', 'true').val('');
	}
}).trigger('change');

function messageData() {
	return {
		'type': $type.val(),
		'custom': $custom.val(),
		'message': $('#ssbm-alert-message').val()
	}
}