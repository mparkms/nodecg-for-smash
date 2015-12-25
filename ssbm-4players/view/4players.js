'use strict';

$(function() {
	nodecg.listenFor('ssbm4PlayerUpdate', update);
	var bgInfo = nodecg.Replicant('bgInfo', 'ssbm-bg-helper');
	var playersData;

	function update(data) {
		playersData = data;
		updateTeams(data);
		updatePlayers(data);
	}

	var colors = {
		'Red': "E44C4B",
		'Green': "00B111",
		'Blue': "4D4DE3"
	}

	function updateTeams(data) {
		if($('#team1name').text() !== data.team1) {
			$('#team1').animate({left: "-10%"}, {duration: 1000, complete: function () {
				if (bgInfo.value.image) {
					updateTeamBackgroundImage();
				} else {
					updateTeamBackgroundGradient(bgInfo.value.color);
				}
				$('#team1name').text(data.team1);
				$('#team1score').text(data.team1Score);
			}});
			$('#team1').animate({left: "0%"}, 1000);
		} else {
			$('#team1score').text(data.team1Score);
		}
		if($('#team2name').text() !== data.team2) {
			$('#team2').animate({left: "10%"}, {duration: 1000, complete: function () {
				if (bgInfo.value.image) {
					updateTeamBackgroundImage();
				} else {
					updateTeamBackgroundGradient(bgInfo.value.color);
				}
				$('#team2name').text(data.team2);
				$('#team2score').text(data.team2Score);
			}});
			$('#team2').animate({left: "0%"}, 1000);
		} else {
			$('#team2score').text(data.team2Score);
		}
	}

	function updatePlayers(data) {
		updatePlayer(data, '1');
		updatePlayer(data, '2');
		updatePlayer(data, '3');
		updatePlayer(data, '4');
	}

	function updatePlayer(data, pNum) {
		//var gradient = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#e8e7e9), color-stop(100%,#" + colors[data['p' + pNum + 'Team']] + "))";	
		// var img = "url('img/bg/" + data['p' + pNum + 'Team'] + " tag.png')"
		if($('#p' + pNum + 'tag').text() !== data['p' + pNum + 'Tag']) {
			$('#player' + pNum).animate({top: "50px"}, {duration: 1000, complete: function () {
				if (bgInfo.value.image) {
					updatePlayerBackgroundImage(pNum);
				} else {
					updatePlayerBackgroundGradient(pNum, bgInfo.value.color);
				}
				if(data['p' + pNum + 'Flag']) {
					$('#p' + pNum + 'flag').attr('class', 'flag flag-' + data['p' + pNum + 'Flag'].toLowerCase());
				}
				$('#p' + pNum + 'tag').text(data['p' + pNum + 'Tag']);
			}});
			$('#player' + pNum).animate({top: "0px"}, 1000);
		} else {
			if (bgInfo.value.image) {
				updatePlayerBackgroundImage(pNum);
			} else {
				updatePlayerBackgroundGradient(pNum, bgInfo.value.color);
			}
			if(data['p' + pNum + 'Flag']) {
				$('#p' + pNum + 'flag').attr('class', 'flag flag-' + data['p' + pNum + 'Flag'].toLowerCase());
			}
		}
	}

	function updateBackgrounds(image, color, corner) {
		if(image) {
			$('.player').css('background', 'none');
			for(var i=1; i<5; i++) updatePlayerBackgroundImage(i);
			$('.team').css('background', 'none');
			updateTeamBackgroundImage();
		} else {
			$('.player').css('background-image', 'none');
			for(var i=1; i<5; i++) updatePlayerBackgroundGradient(i, color);
			$('.player').css('border-radius', corner + 'px')
			$('.team').css('background-image', 'none');
			updateTeamBackgroundGradient(color);
			$('.team').css('border-radius', corner + 'px')
		}
	}

	function updatePlayerBackgroundImage(pNum) {
		if(playersData) {
			var img = "url('img/bg/" + playersData['p' + pNum + 'Team'] + " tag.png')"
		} else {
			var img = "url('img/bg/none tag.png')"
		}
		$('#player' + pNum).css("background-image", img);
	}

	function updateTeamBackgroundImage() {
		if(playersData) {
			$('#team1').css("background-image", "url('img/bg/" + playersData.team1 + " team.png')");
			$('#team2').css("background-image", "url('img/bg/" + playersData.team2 + " team.png')");
		} else {
			$('#team1').css("background-image", "url('img/bg/none team.png')");
			$('#team2').css("background-image", "url('img/bg/none team.png')");
		}
	}

	function updatePlayerBackgroundGradient(pNum, color) {
		if(playersData) {
			var gradient = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#" + color + "), color-stop(100%,#" + colors[playersData['p' + pNum + 'Team']] + "))";
		} else {
			var gradient = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#" + color + "), color-stop(100%,#4D4DE3))";
		}
		$('#player' + pNum).css('background', gradient);
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

	bgInfo.on('change', function(oldValue, newValue) {
		if(oldValue) {
			if(oldValue.image && newValue.image) return;
			else {
				updateBackgrounds(newValue.image, newValue.color, newValue.corner);
			}
		}
	});
});