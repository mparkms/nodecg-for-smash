(function() {
	'use strict';

	var $update = $('.ssbm-bracket-get-challonge');

	var bracketReplicant = nodecg.Replicant('bracket', {defaultValue: [], persistent: false});
	var bracket = [];

	bracketReplicant.on('change', function(oldValue, newValue) {
		bracket = newValue;
	});

	$update.click(function () {
		nodecg.sendMessage('ssbmChallongeUpdate', getChallonge(), function(result) {
			bracketReplicant.value = result;
			nodecg.sendMessage('ssbmBracketUpdate', updateData(bracket));
		});
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
})();