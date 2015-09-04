'use strict';

var $panel = $bundle.filter('.ssbm-playercam');

var $update = $panel.find('.ssbm-playercam-update');

$update.click(function() {
	nodecg.sendMessage('ssbmPlayercam', $('#ssbm-playercam-text').val());
});