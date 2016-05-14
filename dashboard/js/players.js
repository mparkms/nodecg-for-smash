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

		twoPlayer.on('change', function(oldValue, newValue) {
			twoPlayerValue = newValue;
			toggleTwoFour();
		});
		
		teamNamesReplicant.on('change', function(oldValue, newValue){
			document.querySelector('#player1').setTeams(newValue);
			document.querySelector('#player2').setTeams(newValue);
			// document.querySelector('#player3').setTeams(newValue);
			// document.querySelector('#player4').setTeams(newValue);
		});

		$update.click(function() {
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
					'p1Tag': document.querySelector('#player1').getTag(),
					'p1Score': document.querySelector('#player1').getScore(),
					'p1Team': document.querySelector('#team-dropdown1').getSelected(),
					'p1Flag': getCountryCode(document.querySelector('#player1').getFlag()),
					'p1Sponsor': document.querySelector('#player1').getSponsor(),
					'p2Tag': document.querySelector('#player2').getTag(),
					'p2Score': document.querySelector('#player2').getScore(),
					'p2Team': document.querySelector('#team-dropdown2').getSelected(),
					'p2Flag': getCountryCode(document.querySelector('#player2').getFlag()),
					'p2Sponsor': document.querySelector('#player2').getSponsor()
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
			var swap1 = document.querySelector("#player1");
			var swap2 = document.querySelector("#player2");
			var tmp = { // temporarily store the values for player 1
				'tag': swap1.getTag(),
				'score': swap1.getScore(),
				'char': swap1.getCharacter(),
				'flag': swap1.getFlag(),
				'sponsor': swap1.getSponsor(),
				'team': document.querySelector('#team-dropdown1').getSelected()
			};

			swap1.setTag(swap2.getTag());
			swap1.setScore(swap2.getScore());
			swap1.setCharacter(swap2.getCharacter());
			swap1.setFlag(swap2.getFlag());
			swap1.setSponsor(swap2.getSponsor());
			document.querySelector('#team-dropdown1').setSelected((document.querySelector('#team-dropdown2').getSelected()));

			swap2.setTag(tmp.tag);
			swap2.setScore(tmp.score);
			swap2.setCharacter(tmp.char);
			swap2.setFlag(tmp.flag);
			swap2.setSponsor(tmp.sponsor);
			document.querySelector('#team-dropdown2').setSelected(tmp.team);

			return updateData();
		}

		function toggleTwoFour() {
			if (!twoPlayerValue) {
				$('.team-dropdown').show();
				$('.character-select').hide();
				twoPlayer.value = false;
			} else {
				$('.team-dropdown').hide();
				$('.character-select').show();
				twoPlayer.value = true;
			}
		}
	});
})();