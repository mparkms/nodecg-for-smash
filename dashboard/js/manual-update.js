(function() {
	'use strict';

	window.addEventListener('WebComponentsReady', function(e) {
		var bracketReplicant = nodecg.Replicant('bracket', {defaultValue: [], persistent: false});
		var bracket = [];
		var roundMatchReplicant = nodecg.Replicant('roundMatch', {persistent: false});
		var roundMatch;

		bracketReplicant.on('change', function(newValue, oldValue) {
			bracket = newValue;
		});

		roundMatchReplicant.on('change', function(newValue, oldValue) {
			roundMatch = newValue;
			updateFields();
		})

		function updateFields() {
			if (!bracket || !bracket[roundMatch]) return;
			$('#ssbm-bracket-p1name').val(bracket[roundMatch].p1name);
			$('#ssbm-bracket-p1score').val(bracket[roundMatch].score[0]);
			$('#ssbm-bracket-p2name').val(bracket[roundMatch].p2name);
			$('#ssbm-bracket-p2score').val(bracket[roundMatch].score[1]);
			document.querySelector('winner-dropdown').setSelected(bracket[roundMatch].winner);
		}

		document.addEventListener('dialog-confirmed', function() {
			updateBracket();
			nodecg.sendMessage('ssbmBracketUpdateOnly', bracket);
		});

		function updateBracket() {
			if (!bracket[roundMatch]) return;
			bracket[roundMatch].p1name = $('#ssbm-bracket-p1name').val();
			bracket[roundMatch].score[0] = $('#ssbm-bracket-p1score').val();
			bracket[roundMatch].p2name = $('#ssbm-bracket-p2name').val();
			bracket[roundMatch].score[1] = $('#ssbm-bracket-p2score').val();
			bracket[roundMatch].winner = document.querySelector('winner-dropdown').getSelected();
			console.log(bracket);
		}
	});
})();