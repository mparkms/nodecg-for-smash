(function() {
	'use strict';
	window.addEventListener('WebComponentsReady', function(e) {
		var teamNamesReplicant = nodecg.Replicant("teamNames", {defaultvalue: []});
		var teamNames;
		var uploadsReplicant = nodecg.Replicant("uploads");
		var uploads;
		
		teamNamesReplicant.on('change', function (oldvalue, newValue) {
			teamNames = newValue;
			document.querySelector('teams-list').setList(teamNames);
			updateTeamNames();
		});
		
		uploadsReplicant.on('change', function(oldValue, newValue) {
			uploads = newValue;
			updateTeamNames();
		});
		
		function updateTeamNames() {
			var $list = document.querySelector('teams-list');
			if (teamNames && uploads) {
				// if the diff. between the two lengths > 1, uploads hasn't been initialized properly yet
				// i.e. after restarting server
				if (Math.abs(teamNames.length - uploads.length) > 1) return;
				if (teamNames.length < uploads.length) {
					for (var i=teamNames.length; i < uploads.length; i++) {
						$list.addTeam({url: uploads[i].url, name: uploads[i].name});
					}				
					teamNamesReplicant.value = $list.getList();
				}
				if (teamNames.length > uploads.length) {
					var hash = {};
					uploads.forEach(function (e) {
						hash[e.url] = e.url; 
					});
					teamNames.forEach(function (element, index, array) {
						if (!hash[element.url]) {
							$list.removeTeam(index);
						}
					});			
					teamNamesReplicant.value = $list.getList();
				}
			}
		}
	});
})();