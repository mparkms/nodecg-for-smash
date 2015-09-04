'use strict';

$(function() {
	nodecg.listenFor('ssbm4PlayerUpdate', update);

	function update(data) {
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
				var gradient1 = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#e8e7e9), color-stop(100%,#" + colors[data.team1] + "))";		
				$('#team1').css("background", gradient1);
				$('#team1name').text(data.team1);
				$('#team1score').text(data.team1Score);
			}});
			$('#team1').animate({left: "0%"}, 1000);
		} else {
			$('#team1score').text(data.team1Score);
		}
		if($('#team2name').text() !== data.team2) {
			$('#team2').animate({left: "10%"}, {duration: 1000, complete: function () {
				var gradient2 = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#e8e7e9), color-stop(100%,#" + colors[data.team2] + "))";
				$('#team2').css("background", gradient2);
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
		var gradient = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#e8e7e9), color-stop(100%,#" + colors[data['p' + pNum + 'Team']] + "))";		
		if($('#p' + pNum + 'tag').text() !== data['p' + pNum + 'Tag']) {
			$('#player' + pNum).animate({top: "50px"}, {duration: 1000, complete: function () {
				$('#player' + pNum).css("background", gradient);
				$('#p' + pNum + 'flag').attr('class', 'flag flag-' + data['p' + pNum + 'Flag'].toLowerCase());
				$('#p' + pNum + 'tag').text(data['p' + pNum + 'Tag']);
			}});
			$('#player' + pNum).animate({top: "0px"}, 1000);
		} else {
			$('#player' + pNum).css("background", gradient);
			$('#p' + pNum + 'flag').attr('class', 'flag flag-' + data['p' + pNum + 'Flag'].toLowerCase());
		}
	}
});