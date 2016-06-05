'use strict';

$(function () {
	var twoPlayer = nodecg.Replicant('twoPlayer');
	var twoPlayerValue;
	var oldTwoPlayerValue = true;
	var teamNamesReplicant = nodecg.Replicant('teamNames', {defaultValue: []});
	var teamNames;
	nodecg.listenFor('ssbmPlayerUpdate', update);

	twoPlayer.on('change', function(newValue, oldValue) {
		if (newValue == oldValue) return;
		oldTwoPlayerValue = oldValue;
		twoPlayerValue = newValue;
	});
	
	teamNamesReplicant.on('change', function(newValue, oldValue) {
		teamNames = newValue;
	});

	function update(data) {
		console.log(data);
		var toggle = false;
		if (twoPlayerValue != oldTwoPlayerValue) { 
			toggleTwoPlayer(); 
			var toggle = true;
			oldTwoPlayerValue = twoPlayerValue;
		};
		if (twoPlayerValue) { updatePlayers(data, toggle); }
		else { updateFourPlayers(data, toggle); }
	}

	function updatePlayers(data, toggle) {
		var p1new = false;
		var p2new = false;
		if(data.p1Sponsor && data.p1Sponsor != "none") {
			data.p1Tag = data.p1Sponsor + " | " + data.p1Tag;
		}
		if(data.p2Sponsor && data.p2Sponsor != "none") {
			data.p2Tag = data.p2Sponsor + " | " + data.p2Tag;
		}
		if($('#p1tag-2').text() !== data.p1Tag || toggle) {
			$('#player1-2').animate({left: "-100%"}, 1000);
			p1new = true;
		}
		if($('#p2tag-2').text() !== data.p2Tag || toggle) {
			$('#player2-2').animate({left: "100%"}, 1000);
			p2new = true;
		}

		if (p1new || p2new)
			setTimeout(function() { setText(data); }, 1000);
		else setText(data);
		
		if(p1new)
			$('#player1-2').animate({left: "0%"}, 1000);
		if (p2new)
			$('#player2-2').animate({left: "0%"}, 1000);
	}

	function setText(data) {
		$('#p1tag-2').text(data.p1Tag);
		$('#p1score-2').text(data.p1Score);
		$('#p2tag-2').text(data.p2Tag);
		$('#p2score-2').text(data.p2Score);

		if(data.p1Char) {
			$('#p1char-2').attr('class', 'head head-' + data.p1Char);
		}
		if(data.p2Char) {
			$('#p2char-2').attr('class', 'head head-' + data.p2Char);
		}
		if(data.p1Flag) {
			$('#p1flag-2').attr('class', 'flag flag-2player flag-' + data.p1Flag.toLowerCase());
		}
		if(data.p2Flag) {
			$('#p2flag-2').attr('class', 'flag flag-2player flag-' + data.p2Flag.toLowerCase());
		}
		if(data.p1Sponsor) {
			if (data.p1Sponsor == "none") {
				$('#p1sponsor-2').attr('src', "");
				$('#p1sponsor-2').hide();
			} else { 
				teamNames.forEach(function(e) {
					if (e.name == data.p1Sponsor) {
						$('#p1sponsor-2').show();
						$('#p1sponsor-2').attr('src', e.url);
						return;
					}
				});
			}
		}
		if(data.p2Sponsor) {
			if (data.p2Sponsor == "none") {
				$('#p2sponsor-2').attr('src', "");
				$('#p2sponsor-2').hide();			
			} else { 
				teamNames.forEach(function(e) {
					if (e.name == data.p2Sponsor) {
						$('#p2sponsor-2').show();
						$('#p2sponsor-2').attr('src', e.url);
						return;
					}
				});
			}
		}
	}

	function toggleTwoPlayer() {
		if (twoPlayerValue) {
			$('#fourplayers').animate({top: "1070px"}, 1000);
			$('#teams').animate({top: "-50px"}, { duration: 1000,
				complete: function() {
					$('#player1-2').animate({left: "0%"}, 1000);
					$('#player2-2').animate({left: "0%"}, 1000);
				}
			});
		} else {
			$('#player1-2').animate({left: "-100%"}, 1000);
			$('#player2-2').animate({left: "100%"}, { duration: 1000,
				complete: function() {
					$('#fourplayers').animate({top: "1010px"}, 1000);
					$('#teams').animate({top: "5px"}, 1000);
				}
			});
		}
	}

	function updateFourPlayers(data, toggle) {
		updateTeams(data, toggle);
		updatePlayer(data, '1', toggle);
		updatePlayer(data, '2', toggle);
		updatePlayer(data, '3', toggle);
		updatePlayer(data, '4', toggle);
	}

	function updateTeams(data, toggle) {
		if($('#team1name').text() !== data.team1 || toggle) {
			$('#team1').animate({left: "-10%"}, {duration: 1000, complete: function () {
				// if (bgInfo.value.image) {
					updateTeamBackgroundImage(data);
				// } else {
				// 	updateTeamBackgroundGradient(bgInfo.value.color);
				// }
				$('#team1name').text(data.team1);
				$('#team1score').text(data.team1Score);
			}});
			$('#team1').animate({left: "0%"}, 1000);
		} else {
			$('#team1score').text(data.team1Score);
		}
		if($('#team2name').text() !== data.team2 || toggle) {
			$('#team2').animate({left: "10%"}, {duration: 1000, complete: function () {
				// if (bgInfo.value.image) {
					updateTeamBackgroundImage(data);
				// } else {
				// 	updateTeamBackgroundGradient(bgInfo.value.color);
				// }
				$('#team2name').text(data.team2);
				$('#team2score').text(data.team2Score);
			}});
			$('#team2').animate({left: "0%"}, 1000);
		} else {
			$('#team2score').text(data.team2Score);
		}
	}

	function updatePlayer(data, pNum, toggle) {
		//var gradient = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#e8e7e9), color-stop(100%,#" + colors[data['p' + pNum + 'Team']] + "))";	
		// var img = "url('/nodecg-for-smash/graphics/img/backgrounds/" + data['p' + pNum + 'Team'] + " tag.png')"
		if($('#p' + pNum + 'tag-4').text() !== data['p' + pNum + 'Tag'] || toggle) {
			$('#player' + pNum + '-4').animate({top: "50px"}, {duration: 1000, complete: function () {
				// if (bgInfo.value.image) {
					updatePlayerBackgroundImage(pNum, data);
				// } else {
				// 	updatePlayerBackgroundGradient(pNum, bgInfo.value.color);
				// }
				if(data['p' + pNum + 'Flag']) {
					$('#p' + pNum + 'flag-4').attr('class', 'flag flag-4player flag-' + data['p' + pNum + 'Flag'].toLowerCase());
				}
				if(data['p' + pNum + 'Sponsor']) {
					if (data['p' + pNum + 'Sponsor'] == "none") {
						$('#p' + pNum + 'sponsor-4').attr('src', "");
						$('#p' + pNum + 'sponsor-4').hide();
					} else { 
						teamNames.forEach(function(e) {
							if (e.name == data['p' + pNum + 'Sponsor']) {
								$('#p' + pNum + 'sponsor-4').show();
								$('#p' + pNum + 'sponsor-4').attr('src', e.url);
								return;
							}
						});
					}
				}
				$('#p' + pNum + 'tag-4').text(data['p' + pNum + 'Tag']);
			}});
			$('#player' + pNum + '-4').animate({top: "0px"}, 1000);
		} else {
			// if (bgInfo.value.image) {
				updatePlayerBackgroundImage(pNum, data);
			// } else {
			// 	updatePlayerBackgroundGradient(pNum, bgInfo.value.color);
			// }
			if(data['p' + pNum + 'Flag']) {
				$('#p' + pNum + 'flag-4').attr('class', 'flag flag-4player flag-' + data['p' + pNum + 'Flag'].toLowerCase());
			}
			if(data['p' + pNum + 'Sponsor']) {
				if (data['p' + pNum + 'Sponsor'] == "none") {
					$('#p' + pNum + 'sponsor-4').attr('src', "");
					$('#p' + pNum + 'sponsor-4').hide();		
				} else { 
					teamNames.forEach(function(e) {
						if (e.name == data['p' + pNum + 'Sponsor']) {
							$('#p' + pNum + 'sponsor-4').show();
							$('#p' + pNum + 'sponsor-4').attr('src', e.url);
							return;
						}
					});
				}
			}
		}
	}

	function updateBackgrounds(image, color, corner) {
		if(image) {
			$('.fourplayer').css('background', 'none');
			for(var i=1; i<5; i++) updatePlayerBackgroundImage(i);
			$('.team').css('background', 'none');
			updateTeamBackgroundImage();
		} else {
			$('.fourplayer').css('background-image', 'none');
			for(var i=1; i<5; i++) updatePlayerBackgroundGradient(i, color);
			$('.fourplayer').css('border-radius', corner + 'px')
			$('.team').css('background-image', 'none');
			updateTeamBackgroundGradient(color);
			$('.team').css('border-radius', corner + 'px')
		}
	}

	function updatePlayerBackgroundImage(pNum, data) {
		if(data) {
			var img = "url('/graphics/nodecg-for-smash/img/backgrounds/" + data['p' + pNum + 'Team'] + " tag.png')"
		} else {
			var img = "url('/graphics/nodecg-for-smash/img/backgrounds/none tag.png')"
		}
		$('#player' + pNum + '-4').css("background-image", img);
	}

	function updateTeamBackgroundImage(data) {
		if(data) {
			$('#team1').css("background-image", "url('/graphics/nodecg-for-smash/img/backgrounds/" + data.team1 + " team.png')");
			$('#team2').css("background-image", "url('/graphics/nodecg-for-smash/img/backgrounds/" + data.team2 + " team.png')");
		} else {
			$('#team1').css("background-image", "url('/graphics/nodecg-for-smash/img/backgrounds/none team.png')");
			$('#team2').css("background-image", "url('/graphics/nodecg-for-smash/img/backgrounds/none team.png')");
		}
	}

	function updatePlayerBackgroundGradient(pNum, color) {
		if(playersData) {
			var gradient = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#" + color + "), color-stop(100%,#" + colors[playersData['p' + pNum + 'Team']] + "))";
		} else {
			var gradient = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#" + color + "), color-stop(100%,#4D4DE3))";
		}
		$('#player' + pNum + '-4').css('background', gradient);
	}

	function updateTeamBackgroundGradient(color) {
		if(playersData) {
			var gradient1 = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#" + color + "), color-stop(100%,#" + colors[playersData.team1] + "))";	
			var gradient2 = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#" + color + "), color-stop(100%,#" + colors[playersData.team2] + "))";
		} else {
			var gradient1 = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#" + color + "), color-stop(100%,#4D4DE3))";	
			var gradient2 = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#" + color + "), color-stop(100%,#4D4DE3))";
		}
		$('#team1').css("background", gradient1);
		$('#team2').css("background", gradient2);
	}

	var bgInfo = nodecg.Replicant('bgInfo', 'ssbm-bg-helper');

	bgInfo.on('change', function(newValue, oldValue) {
		if(oldValue) {
			if(oldValue.image && newValue.image) return;
			else if (newValue.image) {
				$('.twoplayer').css('background', 'none');
				$('.twoplayer').css('background-image', 'url("img/players.png")');
			} else {
				$('.twoplayer').css('background-image', 'none');
				$('.twoplayer').css('background', '#' + newValue.color);
				$('.twoplayer').css('border-radius', newValue.corner + 'px')
			}
		}
	});
});