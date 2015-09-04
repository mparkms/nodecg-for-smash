'use strict';

$(function () {
	nodecg.listenFor('ssbmPlayerUpdate', updatePlayers);

	function updatePlayers(data) {
		var p1new = false;
		var p2new = false;
		if($('#p1tag').text() !== data.p1Tag) {
			$('#player1').animate({left: "-100%"}, 1000);
			p1new = true;
		}
		if($('#p2tag').text() !== data.p2Tag) {
			$('#player2').animate({left: "100%"}, 1000);
			p2new = true;
		}

		if (p1new || p2new)
			setTimeout(function() { setText(data); }, 1000);
		else setText(data);
		
		if(p1new)
			$('#player1').animate({left: "0%"}, 1000);
		if (p2new)
			$('#player2').animate({left: "0%"}, 1000);
	}

	function setText(data) {
		$('#p1tag').text(data.p1Tag);
		$('#p1score').text(data.p1Score);
		$('#p2tag').text(data.p2Tag);
		$('#p2score').text(data.p2Score);

		if(data.p1Char) {
			$('#p1char').attr('class', 'head head-' + data.p1Char);
		}
		if(data.p2Char) {
			$('#p2char').attr('class', 'head head-' + data.p2Char);
		}
		if(data.p1Flag) {
			$('#p1flag').attr('class', 'flag flag-' + data.p1Flag.toLowerCase());
		}
		if(data.p2Flag) {
			$('#p2flag').attr('class', 'flag flag-' + data.p2Flag.toLowerCase());
		}
		
	}
});