(function() {
	'use strict';
	window.addEventListener('WebComponentsReady', function(e) {
		var $update = $('#ssbm-players-update');
		var $fields = $('#ssbm-fields-update');
		var $swap = $('#ssbm-players-swap');
		var $togglePlayers = $('#ssbm-players-toggle');
		var twoPlayer = nodecg.Replicant('twoPlayer', {defaultValue: true});
		var twoPlayerValue;
		var teamNamesReplicant = nodecg.Replicant('teamNames', {defaultValue: []});
		var playerList = nodecg.Replicant('playerList', {defaultValue: []}); //persistent name list

		/*var playerInputs = document.getElementsByClassName('player-tags');
		for ( var i = 0; i < playerInputs.length; i++ ) {
			$(playerInputs[i]).change(tagInputChanged(i+1));
		}*/

		function tagUpdateFields( num ) {
			var inputTag = $.trim(document.querySelector('#player' + num).getTag());
			try {
				var result = $.grep(playerList.value, function (e) {
					return e.tag == inputTag;
				});
			}
			catch(e)
			{
				return;
			}
			if ( result.length == 0 ) {
				return;
			}
			else if ( result.length >= 1 ) { //fill fields with stored data
				document.querySelector("#player" + num).setCharacter( result[0].char );
				document.querySelector("#player" + num).setFlag( result[0].flag );
				document.querySelector("#player" + num).setSponsor( result[0].sponsor );
			}
		}

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
			//console.log(updateData());
			nodecg.sendMessage('ssbmPlayerUpdate', updateData());
		});

		$swap.click(function() {
			// console.log(swapPlayers());
			nodecg.sendMessage('ssbmPlayerUpdate', swapPlayers());
		});

		$togglePlayers.click(function() {
			twoPlayer.value = !twoPlayerValue;
		});

		$fields.click( function() {
			for ( var i = 0; i < 4; i++ ) {
				tagUpdateFields(i + 1);
			}
		});

		function pushIfNotExist (val) {
			if (typeof(val) == 'undefined' || val == '' || val.tag == "") {
				return;
			}
			var result = $.grep(playerList.value, function(e){ return e.tag == val.tag; });
			if ( result.length == 0 ) {
				playerList.value.push(val);
				console.log(playerList.value);
			}
			else if ( result.length >= 1 ) {
				var index = playerList.value.indexOf(result[0]);
				playerList.value[index] = val;
				console.log(playerList.value);
			}
		};

		function updatePlayerList() {
			$('#players').empty();
			var arrayLength = playerList.value.length;
			for (var i = 0; i < arrayLength; i++) {
				$('#players').append('<option>' + playerList.value[i].tag + '</option>');
			}
		}

		function updateData() {
			pushIfNotExist(getPlayerData(1));
			pushIfNotExist(getPlayerData(2));
			pushIfNotExist(getPlayerData(3));
			pushIfNotExist(getPlayerData(4));
			playerList.value.sort();
			updatePlayerList();
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

		function getPlayerData(num) {
			return {
				tag: $.trim(document.querySelector('#player' + num).getTag()),
				char: document.querySelector('#player' + num).getCharacter(),
				flag: document.querySelector('#player' + num).getFlag(),
				sponsor: document.querySelector('#player' + num).getSponsor()
			}
		}
	});
})();
