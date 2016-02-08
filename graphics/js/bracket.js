'use strict';

$(function() {
	nodecg.listenFor('ssbmBracketUpdate', updateBracket);
	nodecg.listenFor('ssbmBracketUpdateOnly', updateBracketOnly)

	function updateBracket(data) {
		var loser = [0, 2, 1];
		for (var i = 0; i < 11; i++) {
			if (!data.bracket[i]) return;
			$('#' + data.bracket[i].roundMatch + 'p1 > .name').text(data.bracket[i].p1name);
			$('#' + data.bracket[i].roundMatch + 'p1 > .score').text(data.bracket[i].score[0]);
			$('#' + data.bracket[i].roundMatch + 'p2 > .name').text(data.bracket[i].p2name);
			$('#' + data.bracket[i].roundMatch + 'p2 > .score').text(data.bracket[i].score[1]);
			if(data.bracket[i].winner != 0) {
				$('#' + data.bracket[i].roundMatch + 'p' + loser[data.bracket[i].winner] + ' > .name').css({
					'color': '#333',
					'background-color': '#005ea3',
					'text-decoration': 'line-through'
				});
				$('#' + data.bracket[i].roundMatch + 'p' + data.bracket[i].winner + ' > .name').css({
					'color': '#000',
					'background-color': 'transparent',
					'text-decoration': 'none'
				});
			} else {
				$('#' + data.bracket[i].roundMatch + 'p1 > .name').css({
					'color': '#000',
					'background-color': 'transparent',
					'text-decoration': 'none'
				});
				$('#' + data.bracket[i].roundMatch + 'p2 > .name').css({
					'color': '#000',
					'background-color': 'transparent',
					'text-decoration': 'none'
				});
			}
		}
		$('#bracket-link').text(data.link);
		$('#bracket-name').text(data.title);
	}

	function updateBracketOnly(data) {
		updateBracket({'bracket': data, 'link': $('#bracket-link').val(), 'title': $('#bracket-name').val()});
	}
});