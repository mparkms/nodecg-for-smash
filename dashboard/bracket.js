'use strict';

var $panel = $bundle.filter('.ssbm-bracket');

var $update = $panel.find('.ssbm-bracket-get-challonge');
var $match = $('#ssbm-bracket-roundmatch');
var $manual = $panel.find('.ssbm-bracket-manual-update');

var bracket = [];

$update.click(function () {
	nodecg.sendMessage('ssbmChallongeUpdate', getChallonge(), function(result) {
		bracket = result;
		nodecg.sendMessage('ssbmBracketUpdate', updateData(bracket));
	});
});

$match.change(function () {
	var roundMatch = $match.val();
	if (!bracket[roundMatch]) return;
	$('#ssbm-bracket-p1name').val(bracket[roundMatch].p1name);
	$('#ssbm-bracket-p1score').val(bracket[roundMatch].score[0]);
	$('#ssbm-bracket-p2name').val(bracket[roundMatch].p2name);
	$('#ssbm-bracket-p2score').val(bracket[roundMatch].score[1]);
	$('#ssbm-bracket-winner').val(bracket[roundMatch].winner);
})

$manual.click(function () {
	updateBracket();
	nodecg.sendMessage('ssbmBracketUpdate', updateData(bracket));
});

function getChallonge() {
	var link = $('#ssbm-bracket-link').val();
	var parser = document.createElement('a');
	parser.href = link;

	var subdomain = '';
	var hostnameSplit = parser.hostname.split('.');
	if(hostnameSplit.length == 3) {
		subdomain = hostnameSplit[0];
	}

	var path = parser.pathname.split('/')[1];

	return {
		'subdomain': subdomain,
		'path': path,
	}
}

function updateData(bracket) {
	return {
		'bracket': bracket,
		'link': $('#ssbm-bracket-link').val(),
		'title': $('#ssbm-bracket-title').val()
	}
}

function updateBracket() {
	var roundMatch = $match.val();
	if (!bracket[roundMatch]) return;
	bracket[roundMatch].p1name = $('#ssbm-bracket-p1name').val();
	bracket[roundMatch].score[0] = $('#ssbm-bracket-p1score').val();
	bracket[roundMatch].p2name = $('#ssbm-bracket-p2name').val();
	bracket[roundMatch].score[1] = $('#ssbm-bracket-p2score').val();
	bracket[roundMatch].winner = $('#ssbm-bracket-winner').val();
}