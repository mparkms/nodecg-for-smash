module.exports = function(nodecg) {
	var challonge = require('./node-challonge');

	var client = challonge.createClient({
		apiKey: 'YlETxrtIVBw6w1WQNJNFpqsrMIqwFEIoFy5472Uy'
	});

	var matches = {};

	nodecg.listenFor('ssbmChallongeUpdate', function (data, callback) {
		getMatches(data, callback);
	})

	function getMatches(linkData, origCallback) {
		client.setSubdomain(linkData.subdomain);
		client.tournaments.show({
			id: linkData.path,
			callback: function(err, tournamentData) {
				if (err) { console.log(err); return; }
				// check if tournament is DE
				if (tournamentData.tournament.tournamentType != "double elimination") {
					console.log("Tournament is not double elimination format. Will not import.");
					return;
				};
				client.matches.index({
					id: linkData.path,
					callback: function(err, matchData) {
						if (err) { console.log(err); return; }
						client.participants.index({
							id: linkData.path,
							callback: function(err, playerData) {
								if (err) { console.log(err); return; }
								//console.log(data);
								var top8 = parseMatches(matchData, playerData);
								origCallback(top8);
							}
						})
					}
				});
			}
		});
	}

	function parseMatches(matches, players) {
		var top8 = [];
		var top8matches = [];
		var top8players = {};
		var playerNum = players.length;
		var matchNum = matches.length;
		var indexRoundMatch = ['r1m1', 'r1m2', 'r2m1', 'l1m1', 'l1m2', 'l2m1', 'l2m2', 'l3m1', 'l4m1', 'r3m1', 'r3m2'];

		// check if less than 8 players
		if (playerNum < 8 && playerNum > 4) {
			// 7 players: 3 WQ matches, 1 Loser's Eighths matches (loser of WQ1 gets L8 bye)
			// 6 players: 2 WQ matches, 0 Loser's Eighths matches
			// 5 players: 1 WQ match,   0 Loser's Eighths matches, 1 LQ match (loser of WS1 gets LQ bye)
			var firstWS = playerNum - 4; // match index of first WS set
			for (var i = 0; i < 3; i++) {
				top8matches[i] = matches[firstWS + i];
			}
			if (matchNum % 2 == 0) { // even if no reset, odd if reset
				for (var i = 1; i <= playerNum - 1; i++) {
					top8matches[10-i] = matches[matchNum - i];
				}
			} else {
				for (var i = 1; i <= playerNum; i++) {
					top8matches[11-i] = matches[matchNum - i];
				}
			}
			var top8matchNum = matchNum - firstWS;
		} else if (playerNum <= 4) {
			// 4 players: 0 WQ matches, 0 Loser's Eighths matches, 0 LQ matches (losers of WS get LQ byes)
			// 3 players: 0 WQ matches, 1 WS match, 0 L8 matches,  0 LQ matches, 0 LS matches (loser of WS gets byes into LF)
			// 2 players: 1 WF match, loser gets byes directly into GF
			var winnersFinalsIndex = playerNum - 2; // match index of WF set
			for (var i = 0; i <= winnersFinalsIndex; i++) {
				top8matches[2-i] = matches[winnersFinalsIndex - i];
			}
			if (matchNum % 2 == 0) { // even if no reset, odd if reset
				for (var i = 1; i <= playerNum - 1; i++) {
					top8matches[10-i] = matches[matchNum - i];
				}
			} else {
				for (var i = 1; i <= playerNum; i++) {
					top8matches[11-i] = matches[matchNum - i];
				}
			}
			var top8matchNum = matchNum;
		} else { // playerNum >= 8
			// top8matches: 0-1 = r1, 2 = r2, 3-4 = l1, 5-6 = l2, 7 = l3, 8 = l4, 9 = r3m1, 10 = r3m2 (bracket reset)
			for (var i = 2; i <= 4; i++) { // winners semis and finals
				top8matches[4-i] = matches[playerNum - i];
			}
			if (matchNum % 2 == 0) { // even if no reset, odd if reset
				for (var i = 1; i <= 7; i++) { // losers + grand finals
					top8matches[10-i] = matches[matchNum - i];
				}
			} else {
				for (var i = 1; i <= 8; i++) { // losers + 2 grand finals sets
					top8matches[11-i] = matches[matchNum - i];
				}
			}
			var top8matchNum = top8matches.length;
		}

		for (var i = 0; i < 11; i++) {
			// check if match at index exists
			if(!top8matches[i]) {
				// set all vars to blank
				var p1Name = '';
				var p2Name = '';
				var winner = 0;
				var score = ['', ''];
			} else {
				// get name associated with p1's id
				if(top8matches[i].match.player1Id) {
					var p1Id = top8matches[i].match.player1Id.toString();
					if (!top8players[p1Id]) { // check if id is already in top8players
						top8players[p1Id] = findPlayer(players, p1Id);
					}
					var p1Name = top8players[p1Id];
				} else var p1Name = '';

				// get name associated with p2's id
				if(top8matches[i].match.player2Id) {
					var p2Id = top8matches[i].match.player2Id.toString();
					if (!top8players[p2Id]) { // check if id is already in top8players
						top8players[p2Id] = findPlayer(players, p2Id);
					}
					var p2Name = top8players[p2Id];
				} else var p2Name = '';

				// get winner
				if (top8matches[i].match.winnerId == p1Id) {
					var winner = 1;
				} else if (top8matches[i].match.winnerId == p2Id) {
					var winner = 2;
				} else {
					var winner = 0;
				}

				//get score (score[0] = p1's score, score[1] = p2's score)
				var score = top8matches[i].match.scoresCsv.split('-');
				score.push('');
			}

			top8[i] = {
				'roundMatch': indexRoundMatch[i],
				'p1name': p1Name,
				'p2name': p2Name,
				'winner': winner,
				'score': score
			}
		}

		console.log(top8players);
		console.log(top8);
		return top8;
	}

	function findPlayer(players, id) {
		for (var i = 0; i < players.length; i++) {
			if (players[i].participant.id == id) { return players[i].participant.name; }
		}

		return "Error: Player not found";
	}
}