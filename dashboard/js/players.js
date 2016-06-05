(function() {
	'use strict';
	window.addEventListener('WebComponentsReady', function(e) {
		var $update = $('#ssbm-players-update');
		var $swap = $('#ssbm-players-swap');
		var $togglePlayers = $('#ssbm-players-toggle');
		var twoPlayer = nodecg.Replicant('twoPlayer', {defaultValue: true});
		var twoPlayerValue;
		var teamNamesReplicant = nodecg.Replicant('teamNames', {defaultValue: []});
		// var countrycodes = JSON.parse(data);
		// console.log(countryCodes);

		twoPlayer.on('change', function(newValue, oldValue) {
			twoPlayerValue = newValue;
			toggleTwoFour();
		});
		
		teamNamesReplicant.on('change', function(newValue, oldValue){
			document.querySelector('#player1').setTeams(newValue);
			document.querySelector('#player2').setTeams(newValue);
			document.querySelector('#player3').setTeams(newValue);
			document.querySelector('#player4').setTeams(newValue);
		});

		$update.click(function() {
			console.log(updateData());
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
					'p1Tag': document.querySelector('#player1').getTag(),
					'p1Score': document.querySelector('#player1').getScore(),
					'p1Char': getCharacter(document.querySelector('#player1').getCharacter()),
					'p1Flag': getCountryCode(document.querySelector('#player1').getFlag()),
					'p1Sponsor': document.querySelector('#player1').getSponsor(),
					'p2Tag': document.querySelector('#player2').getTag(),
					'p2Score': document.querySelector('#player2').getScore(),
					'p2Char': getCharacter(document.querySelector('#player2').getCharacter()),
					'p2Flag': getCountryCode(document.querySelector('#player2').getFlag()),
					'p2Sponsor': document.querySelector('#player2').getSponsor()
				};
			} else {
				return {
					'team1': document.querySelector('#team1').getTeam(),
					'team1Score': document.querySelector('#team1').getScore(),
					'team2': document.querySelector('#team2').getTeam(),
					'team2Score': document.querySelector('#team2').getScore(),
					'p1Tag': document.querySelector('#player1').getTag(),
					'p1Team': document.querySelector('#team-dropdown1').getSelected(),
					'p1Flag': getCountryCode(document.querySelector('#player1').getFlag()),
					'p1Sponsor': document.querySelector('#player1').getSponsor(),
					'p2Tag': document.querySelector('#player2').getTag(),
					'p2Team': document.querySelector('#team-dropdown2').getSelected(),
					'p2Flag': getCountryCode(document.querySelector('#player2').getFlag()),
					'p2Sponsor': document.querySelector('#player2').getSponsor(),
					'p3Tag': document.querySelector('#player3').getTag(),
					'p3Team': document.querySelector('#team-dropdown3').getSelected(),
					'p3Flag': getCountryCode(document.querySelector('#player3').getFlag()),
					'p3Sponsor': document.querySelector('#player3').getSponsor(),
					'p4Tag': document.querySelector('#player4').getTag(),
					'p4Team': document.querySelector('#team-dropdown4').getSelected(),
					'p4Flag': getCountryCode(document.querySelector('#player4').getFlag()),
					'p4Sponsor': document.querySelector('#player4').getSponsor()
				};
			}
		}

		function getCountryCode(name) {
			if (countryCodes[name]) return countryCodes[name];
			return "XX";
		}

		function getCharacter(name) {
			if (characters[name]) return characters[name];
			return "none";
		}

		function swapPlayers() {
			if (twoPlayerValue) {
				var swap1 = document.querySelector("#player1");
				var swap2 = document.querySelector("#player2");
				var tmp = { // temporarily store the values for player 1
					'tag': swap1.getTag(),
					'score': swap1.getScore(),
					'char': swap1.getCharacter(),
					'flag': swap1.getFlag(),
					'sponsor': swap1.getSponsor()
				};

				swap1.setTag(swap2.getTag());
				swap1.setScore(swap2.getScore());
				swap1.setCharacter(swap2.getCharacter());
				swap1.setFlag(swap2.getFlag());
				swap1.setSponsor(swap2.getSponsor());

				swap2.setTag(tmp.tag);
				swap2.setScore(tmp.score);
				swap2.setCharacter(tmp.char);
				swap2.setFlag(tmp.flag);
				swap2.setSponsor(tmp.sponsor);
			} else {
				var swap1number = document.querySelector('#swap1').getSelected();
				var swap2number = document.querySelector('#swap2').getSelected()
				var swap1 = document.querySelector("#player" + swap1number);
				var swap2 = document.querySelector("#player" + swap2number);
				var tmp = {
					'tag': swap1.getTag(),
					'team': document.querySelector('#team-dropdown' + swap1number).getSelected(),
					'flag': swap1.getFlag(),
					'sponsor': swap1.getSponsor()
				};

				swap1.setTag(swap2.getTag());
				document.querySelector('#team-dropdown' + swap1number).setSelected(document.querySelector('#team-dropdown' + swap2number).getSelected());
				swap1.setFlag(swap2.getFlag());
				swap1.setSponsor(swap2.getSponsor());

				swap2.setTag(tmp.tag);
				document.querySelector('#team-dropdown' + swap2number).setSelected(tmp.team)
				swap2.setFlag(tmp.flag);
				swap2.setSponsor(tmp.sponsor);
			}		

			return updateData();
		}

		function toggleTwoFour() {
			if (!twoPlayerValue) {
				$('#p3p4').show();
				$('.teams').show();
				$('.team-dropdown').show();
				$('.character-select').hide();
				$('swap-dropdown').show();
				// $('#ssbm-players-swap').hide();
				$('.player-score').attr('disabled', true);
				twoPlayer.value = false;
			} else {
				$('#p3p4').hide();
				$('.teams').hide();
				$('.team-dropdown').hide();
				$('.character-select').show();
				$('swap-dropdown').hide();
				// $('#ssbm-players-swap').show();
				$('.player-score').attr('disabled', false);
				twoPlayer.value = true;
			}
		}
	});
})();