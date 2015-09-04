'use strict';

var $panel = $bundle.filter('.ssbm-4players');

var $update = $panel.find('.ssbm-4players-update');
var $swap = $panel.find('.ssbm-4players-swap');

$update.click(function() {
	nodecg.sendMessage('ssbm4PlayerUpdate', updateData());
});

$swap.click(function() {
	nodecg.sendMessage('ssbm4PlayerUpdate', swapPlayers());
});

function updateData() {
	return {
		'p1Tag': $('#ssbm-4p-p1Tag').val(),
		'p1Team': $('#ssbm-4p-p1Team').val(),
		'p1Flag': $('#ssbm-4p-p1Flag').val(),
		'p2Tag': $('#ssbm-4p-p2Tag').val(),
		'p2Team': $('#ssbm-4p-p2Team').val(),
		'p2Flag': $('#ssbm-4p-p2Flag').val(),
		'p3Tag': $('#ssbm-4p-p3Tag').val(),
		'p3Team': $('#ssbm-4p-p3Team').val(),
		'p3Flag': $('#ssbm-4p-p3Flag').val(),
		'p4Tag': $('#ssbm-4p-p4Tag').val(),
		'p4Team': $('#ssbm-4p-p4Team').val(),
		'p4Flag': $('#ssbm-4p-p4Flag').val(),
		'team1': $('#ssbm-4p-team1').val(),
		'team1Score': $('#ssbm-4p-team1Score').val(),
		'team2': $('#ssbm-4p-team2').val(),
		'team2Score': $('#ssbm-4p-team2Score').val()
	}
}

function swapPlayers() {
	var swapP1 = $('#ssbm-4p-swap1').val();
	var swapP2 = $('#ssbm-4p-swap2').val();

	var tmp = {
		'tag': $('#ssbm-4p-p'+ swapP1 + 'Tag').val(),
		'score': $('#ssbm-4p-p'+ swapP1 + 'Score').val(),
		'team': $('#ssbm-4p-p'+ swapP1 + 'Team').val(),
		'flag': $('#ssbm-4p-p'+ swapP1 + 'Flag').val(),
	}

	$('#ssbm-4p-p' + swapP1 + 'Tag').val($('#ssbm-4p-p' + swapP2 + 'Tag').val());
	$('#ssbm-4p-p' + swapP1 + 'Score').val($('#ssbm-4p-p' + swapP2 + 'Score').val());
	$('#ssbm-4p-p' + swapP1 + 'Team').val($('#ssbm-4p-p' + swapP2 + 'Team').val());
	$('#ssbm-4p-p' + swapP1 + 'Flag').val($('#ssbm-4p-p' + swapP2 + 'Flag').val());

	$('#ssbm-4p-p' + swapP2 + 'Tag').val(tmp.tag);
	$('#ssbm-4p-p' + swapP2 + 'Score').val(tmp.score);
	$('#ssbm-4p-p' + swapP2 + 'Team').val(tmp.team);
	$('#ssbm-4p-p' + swapP2 + 'Flag').val(tmp.flag);

	return updateData();
}