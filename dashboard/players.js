(function() {
	'use strict';

	console.log('players.js');

	var $update = $('#ssbm-players-update');
	var $swap = $('#ssbm-players-swap');
	var $togglePlayers = $('#ssbm-players-toggle');
	var twoPlayer = nodecg.Replicant('twoPlayer', {defaultValue: true});
	var twoPlayerValue;
	// var countrycodes = JSON.parse(data);
	console.log(countryCodes);

	twoPlayer.on('change', function(oldValue, newValue) {
		twoPlayerValue = newValue;
		toggleTwoFour();
	})

	$update.click(function() {
		console.log(updateData());
		// nodecg.sendMessage('ssbmPlayerUpdate', updateData());
	});

	$swap.click(function() {
		console.log(swapPlayers());
		// nodecg.sendMessage('ssbmPlayerUpdate', swapPlayers());
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
				'p1Flag': $('#ssbm-p1Flag').val(),
				'p2Tag': $('#ssbm-p2Tag').val(),
				'p2Score': $('#ssbm-p2Score').val(),
				'p2Char': $('#ssbm-p2Char').val(),
				'p2Flag': $('#ssbm-p2Flag').val()
			};
		} else {
			return {
				'p1Tag': $('#ssbm-p1Tag').val(),
				'p1Team': $('#ssbm-p1Team').val(),
				'p1Flag': $('#ssbm-p1Flag').val(),
				'p2Tag': $('#ssbm-p2Tag').val(),
				'p2Team': $('#ssbm-p2Team').val(),
				'p2Flag': $('#ssbm-p2Flag').val(),
				'p3Tag': $('#ssbm-p3Tag').val(),
				'p3Team': $('#ssbm-p3Team').val(),
				'p3Flag': $('#ssbm-p3Flag').val(),
				'p4Tag': $('#ssbm-p4Tag').val(),
				'p4Team': $('#ssbm-p4Team').val(),
				'p4Flag': $('#ssbm-p4Flag').val()
			};
		}
	}

	function swapPlayers() {
		// if (twoPlayerValue) {
			var swap1 = "1";
			var swap2 = "2";
			var tmp = { // temporarily store the values for player 1
				'tag': $('#ssbm-p' + swap1 + 'Tag').val(),
				'score': $('#ssbm-p' + swap1 + 'Score').val(),
				'char': $('#ssbm-p' + swap1 + 'Char').val(),
				'flag': $('#ssbm-p' + swap1 + 'Flag').val(),
			}
		// } else {
		// 	var swap1 = $('#swap1').val().split(' ')[1];
		// 	var swap2 = $('#swap2').val().split(' ')[1];
		// 	var tmp = { // temporarily store the values for player 1
		// 		'tag': $('#ssbm-p' + swap1 + 'Tag').val(),
		// 		'team': teams[$('#ssbm-p' + swap1 + 'Team').val()],
		// 		'flag': $('#ssbm-p' + swap1 + 'Flag').val(),
		// 	}
		// 	console.log(tmp.team);
		// }
		// console.log(swap1);
		
		$('#ssbm-p' + swap1 + 'Tag').val($('#ssbm-p' + swap2 + 'Tag').val());
		// if (twoPlayerValue) {
			$('#ssbm-p' + swap1 + 'Score').val($('#ssbm-p' + swap2 + 'Score').val());
			$('#ssbm-p' + swap1 + 'Char').val($('#ssbm-p' + swap2 + 'Char').val());
		// } else {
		// 	$('p1Team-menu').find('option[value=' + teams[$('#ssbm-p' + swap2 + 'Team').val()] + ']')
		// 								 .attr('selected', 'selected');
		// 	// console.log($('#p1Team-menu'));
		// 	// $('p1Team-menu').val(teams[$('#ssbm-p' + swap2 + 'Team').val()]);
		// }
		$('#ssbm-p' + swap1 + 'Flag').val($('#ssbm-p' + swap2 + 'Flag').val());

		$('#ssbm-p' + swap2 + 'Tag').val(tmp.tag);
		// if (twoPlayerValue) {
			$('#ssbm-p' + swap2 + 'Score').val(tmp.score);
			$('#ssbm-p' + swap2 + 'Char').val(tmp.char);
		// } else {
		// 	// $('#ssbm-p' + swap2 + 'Team').find('.dropdown-content').attr('selected', tmp.team);
		// 	$('p2Team-menu').find('paper-item[value=' 
		// 										+ tmp.team + ']')
		// 								 .attr('selected', 'selected');
		// 	$('p2Team-menu').val(teams[$('#ssbm-p' + swap2 + 'Team').val()]);
		// }
		$('#ssbm-p' + swap2 + 'Flag').val(tmp.flag);

		return updateData();
	}

	function toggleTwoFour() {
		// console.log(twoPlayerValue);
		if (!twoPlayerValue) {
			$('#p3p4').show();
			$('.teams').show();
			// $('#swap1').attr('disabled', false);
			// $('#swap1').show();
			// $('#swap2').attr('disabled', false);
			// $('#swap2').show();
			$('.team-dropdown').show();
			$('.character-select').hide();
			$('#ssbm-players-swap').hide();
			twoPlayer.value = false;
		} else {
			$('#p3p4').hide();
			$('.teams').hide();
			// $('#swap1').attr('disabled', true);
			// $('#swap1').hide();
			// $('#swap2').attr('disabled', true);
			// $('#swap2').hide();
			$('.team-dropdown').hide();
			$('.character-select').show();
			$('#ssbm-players-swap').show();
			twoPlayer.value = true;
		}
	}
})();