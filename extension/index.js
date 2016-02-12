'use strict';

module.exports = function(nodecg) {
	require('./check-update-ext')(nodecg, 'nodecg-for-smash', 'mparkms/nodecg-for-smash');
	require('./node-challonge-ext')(nodecg);
	require('./obs-remote-ext')(nodecg);
}