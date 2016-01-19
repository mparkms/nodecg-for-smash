'use strict';

var $panel = $bundle.filter('.ssbm-bg-helper');

var $update = $panel.find('.ssbm-bg-change');
var $image = $panel.find('#ssbm-bg-helper-image');
var $color = $panel.find('#ssbm-bg-helper-color');
var $corner = $panel.find('#ssbm-bg-helper-corner');

var bgInfo = nodecg.Replicant('bgInfo', {defaultValue: {image: true, color: '000000', corner: 5}});

$update.click(function() {
	bgInfo.value = {
		image: $image.prop('checked'),
		color: $color.val(),
		corner: $corner.val()
	}
});