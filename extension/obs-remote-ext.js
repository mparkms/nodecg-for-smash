module.exports = function(nodecg) {
	var OBSRemote = require('obs-remote');
	var obs = new OBSRemote();
	obs.connect('localhost');

	nodecg.listenFor('ssbmScenesUpdate', function (data, callback) {
		obs.getSceneList(function(currentScene, scenes) {
			callback(scenes);
		});
	});

	nodecg.listenFor('ssbmSceneChange', function (data) {
		obs.setCurrentScene(data);
	});
}