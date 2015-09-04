'use strict';

var $panel = $bundle.filter('.ssbm-crew-roster');

var $update = $panel.find('.ssbm-crew-update');
var $hide = $panel.find('.ssbm-crew-hide');

$update.click(function () {
	nodecg.sendMessage('ssbmCrewUpdate', updateData());
});

$hide.click(function() {
	nodecg.sendMessage('ssbmCrewHide', 0);
})

function updateData() {
	var roster1 = getRoster(1);
	var roster2 = getRoster(2);
	var teamNamesStock = getTeamNamesStock();
	var kos1 = getKOs(1);
	var kos2 = getKOs(2);

	return {
		'roster1': roster1,
		'roster2': roster2,
		'teamNamesStock': teamNamesStock,
		'kos1': kos1,
		'kos2': kos2
	}
}

function getRoster(team) {
	var roster = [];

	for(var i = 1; i <= 10; i++) {
		roster.push($('#ssbm-crew' + team + '-p' + i).val());
	}

	return roster;
}

function getTeamNamesStock() {
	return {
		'team1name': $('#ssbm-crew1-name').val(),
		'team1stock': $('#ssbm-crew1-stocks').val(),
		'team2name': $('#ssbm-crew2-name').val(),
		'team2stock': $('#ssbm-crew2-stocks').val()
	}
}

function getKOs(team) {
	var kos = [];
	for(var i = 1; i <= 10; i++) {
		kos.push($('#ssbm-crew' + team + '-ko' + i).is(':checked'));
	}

	return kos;
}