'use strict';

$(function() {
	nodecg.listenFor('ssbmCrewUpdate', updateRosters);
	nodecg.listenFor('ssbmCrewHide', hideRosters);

	function updateRosters(data) {
		var rosterSize = 10;
		for (var i = 0; i < rosterSize; i++) {
			$('#rosterleft > div:nth-child(' + (i + 1) + ')').text(data.roster1[i]);
			$('#rosterright > div:nth-child(' + (i + 1) + ')').text(data.roster2[i]);
			if(data.kos1[i]) {
				$('#rosterleft > div:nth-child(' + (i + 1) + ')').css({
					'color': '#888',
					'background-color': '#ddd',
					'text-decoration': 'line-through'
				});
			} else {
				$('#rosterleft > div:nth-child(' + (i + 1) + ')').css({
					'color': '#000',
					'background-color': '#eee',
					'text-decoration': 'none'
				}); 
			}
			if(data.kos2[i]) {
				$('#rosterright > div:nth-child(' + (i + 1) + ')').css({
					'color': '#888',
					'background-color': '#ddd',
					'text-decoration': 'line-through'
				}); 
			} else {
				$('#rosterright > div:nth-child(' + (i + 1) + ')').css({
					'color': '#000',
					'background-color': '#eee',
					'text-decoration': 'none'
				}); 
			}
		}

		$('#crewnameleft').text(data.teamNamesStock.team1name);
		$('#crewstockleft').text(data.teamNamesStock.team1stock);
		$('#crewnameright').text(data.teamNamesStock.team2name);
		$('#crewstockright').text(data.teamNamesStock.team2stock);

		showRosters();
	}

	function showRosters() {
		var delay = 50;
		var rosterSize = 10;
		$('#rosterheaderleft').animate({left: "0%"}, 500);
		$('#rosterheaderright').animate({left: "0%"}, 500);
		for (var i = 1; i <= rosterSize; i++) {
			$('#rosterleft > div:nth-child(' + i + ')')
				.delay(delay * i)
				.queue(function(nxt) { 
					$(this).animate({left: "0%"}, 500);
					nxt();
				});
			$('#rosterright > div:nth-child(' + i + ')')
				.delay(delay * i)
				.queue(function(nxt) { 
					$(this).animate({left: "0%"}, 500);
					nxt();
				});
		}
		//$('#rosterleft').animate({left: "0%"}, 500);
		//$('#rosterright').animate({left: "0%"}, 500);
	}

	function hideRosters(data) {
		var delay = 50;
		var rosterSize = 10;
		$('#rosterheaderleft').animate({left: "-275px"}, 500);
		$('#rosterheaderright').animate({left: "275px"}, 500);
		for (var i = 1; i <= rosterSize; i++) {
			$('#rosterleft > div:nth-child(' + i + ')')
				.delay(delay * i)
				.queue(function(nxt) { 
					$(this).animate({left: "-275px"}, 500);
					nxt();
				});
			$('#rosterright > div:nth-child(' + i + ')')
				.delay(delay * i)
				.queue(function(nxt) { 
					$(this).animate({left: "275px"}, 500);
					nxt();
				});
		}
		//$('#rosterleft').animate({left: "-275px"}, 500);
		//$('#rosterright').animate({left: "275px"}, 500);
	}
})