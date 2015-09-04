'use strict';

var $panel = $bundle.filter('.ssbm-players');

var $update = $panel.find('.ssbm-players-update');
var $swap = $panel.find('.ssbm-players-swap');

$update.click(function() {
	nodecg.sendMessage('ssbmPlayerUpdate', updateData());
});

$swap.click(function() {
	nodecg.sendMessage('ssbmPlayerUpdate', swapPlayers());
});

function updateData() {
	return {
		'p1Tag': $('#ssbm-p1Tag').val(),
		'p1Score': $('#ssbm-p1Score').val(),
		'p1Char': $('#ssbm-p1Char').val(),
		'p1Flag': $('#ssbm-p1Flag').val(),
		'p2Tag': $('#ssbm-p2Tag').val(),
		'p2Score': $('#ssbm-p2Score').val(),
		'p2Char': $('#ssbm-p2Char').val(),
		'p2Flag': $('#ssbm-p2Flag').val()
	};
}

function swapPlayers() {
	var tmp = { // temporarily store the values for player 1
		'tag': $('#ssbm-p1Tag').val(),
		'score': $('#ssbm-p1Score').val(),
		'char': $('#ssbm-p1Char').val(),
		'flag': $('#ssbm-p1Flag').val(),
	}
	$('#ssbm-p1Tag').val($('#ssbm-p2Tag').val());
	$('#ssbm-p1Score').val($('#ssbm-p2Score').val());
	$('#ssbm-p1Char').val($('#ssbm-p2Char').val());
	$('#ssbm-p1Flag').val($('#ssbm-p2Flag').val());

	$('#ssbm-p2Tag').val(tmp.tag);
	$('#ssbm-p2Score').val(tmp.score);
	$('#ssbm-p2Char').val(tmp.char);
	$('#ssbm-p2Flag').val(tmp.flag);

	return updateData();
}