(function() {
	'use strict';

	var $update = $('#ssbm-players-update');
	var $swap = $('#ssbm-players-swap');
	var $togglePlayers = $('#ssbm-players-toggle');
	var twoPlayer = nodecg.Replicant('twoPlayer', {defaultValue: true});
	var twoPlayerValue;
	// var countrycodes = JSON.parse(data);
	// console.log(countryCodes);

	twoPlayer.on('change', function(oldValue, newValue) {
		twoPlayerValue = newValue;
		toggleTwoFour();
	})

	$update.click(function() {
		// console.log(updateData());
		nodecg.sendMessage('ssbmPlayerUpdate', updateData());
	});

	$swap.click(function() {
		// console.log(swapPlayers());
		nodecg.sendMessage('ssbmPlayerUpdate', swapPlayers());
	});

	$togglePlayers.click(function() {
		twoPlayer.value = !twoPlayerValue;
	});

	function updateData() {
		if (twoPlayerValue) {
			return {
				'p1Tag': $('#ssbm-p1Tag').val(),
				'p1Score': $('#ssbm-p1Score').val(),
				'p1Char': $('#ssbm-p1Char').val(),
				'p1Flag': getCountryCode($('#ssbm-p1Flag').val()),
				'p2Tag': $('#ssbm-p2Tag').val(),
				'p2Score': $('#ssbm-p2Score').val(),
				'p2Char': $('#ssbm-p2Char').val(),
				'p2Flag': getCountryCode($('#ssbm-p2Flag').val())
			};
		} else {
			return {
				'team1': $('#ssbm-team1').val(),
				'team1Score': $('#ssbm-team1Score').val(),
				'team2': $('#ssbm-team2').val(),
				'team2Score': $('#ssbm-team2Score').val(),
				'p1Tag': $('#ssbm-p1Tag').val(),
				'p1Team': $('#ssbm-p1Team').val(),
				'p1Flag': getCountryCode($('#ssbm-p1Flag').val()),
				'p2Tag': $('#ssbm-p2Tag').val(),
				'p2Team': $('#ssbm-p2Team').val(),
				'p2Flag': getCountryCode($('#ssbm-p2Flag').val()),
				'p3Tag': $('#ssbm-p3Tag').val(),
				'p3Team': $('#ssbm-p3Team').val(),
				'p3Flag': getCountryCode($('#ssbm-p3Flag').val()),
				'p4Tag': $('#ssbm-p4Tag').val(),
				'p4Team': $('#ssbm-p4Team').val(),
				'p4Flag': getCountryCode($('#ssbm-p4Flag').val())
			};
		}
	}

	function getCountryCode(name) {
		if (countryCodes[name]) return countryCodes[name];
		return "XX";
	}

	function swapPlayers() {
			var swap1 = "1";
			var swap2 = "2";
			var tmp = { // temporarily store the values for player 1
				'tag': $('#ssbm-p' + swap1 + 'Tag').val(),
				'score': $('#ssbm-p' + swap1 + 'Score').val(),
				'char': $('#ssbm-p' + swap1 + 'Char').val(),
				'flag': $('#ssbm-p' + swap1 + 'Flag').val(),
			}
		
		$('#ssbm-p' + swap1 + 'Tag').val($('#ssbm-p' + swap2 + 'Tag').val());
		$('#ssbm-p' + swap1 + 'Score').val($('#ssbm-p' + swap2 + 'Score').val());
		$('#ssbm-p' + swap1 + 'Char').val($('#ssbm-p' + swap2 + 'Char').val());
		$('#ssbm-p' + swap1 + 'Flag').val($('#ssbm-p' + swap2 + 'Flag').val());

		$('#ssbm-p' + swap2 + 'Tag').val(tmp.tag);
		$('#ssbm-p' + swap2 + 'Score').val(tmp.score);
		$('#ssbm-p' + swap2 + 'Char').val(tmp.char);
		$('#ssbm-p' + swap2 + 'Flag').val(tmp.flag);

		return updateData();
	}

	function toggleTwoFour() {
		if (!twoPlayerValue) {
			$('#p3p4').show();
			$('.teams').show();
			$('.team-dropdown').show();
			$('.character-select').hide();
			$('#ssbm-players-swap').hide();
			$('.player-score').attr('disabled', true);
			twoPlayer.value = false;
		} else {
			$('#p3p4').hide();
			$('.teams').hide();
			$('.team-dropdown').hide();
			$('.character-select').show();
			$('#ssbm-players-swap').show();
			$('.player-score').attr('disabled', false);
			twoPlayer.value = true;
		}
	}
})();