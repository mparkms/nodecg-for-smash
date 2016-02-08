(function() {
	'use strict';

	// var OBSRemote = require('obs-remote');
	// var obs = new OBSRemote();
	// obs.connect('localhost');

	var $sceneUpdate = $('.ssbm-scene-update');
	var $changeNoTrans = $('.ssbm-scene-change-no-trans');
	var $changeTrans = $('.ssbm-scene-change-trans');
	var $changeTransDown = $('.ssbm-scene-change-trans-down');
	var $transUp = $('.ssbm-trans-up');

	$sceneUpdate.click(function() {
		nodecg.sendMessage('ssbmScenesUpdate', 0, function(result) {
			updateScenes(result);
		});
	});

	$changeNoTrans.click(function() {
		// console.log(document.querySelector('#scenes').getSelected());
		nodecg.sendMessage('ssbmSceneChange', document.querySelector('#scenes').getSelected());
	});

	$changeTrans.click(function() {
		nodecg.sendMessage('ssbmDropIn');
		setTimeout(function() {	nodecg.sendMessage('ssbmSceneChange', document.querySelector('#scenes').getSelected()); }, 800);
		setTimeout(function() { nodecg.sendMessage('ssbmDropOut'); }, 1000);
	});

	$changeTransDown.click(function() {
		nodecg.sendMessage('ssbmDropIn');
		setTimeout(function() {	nodecg.sendMessage('ssbmSceneChange', document.querySelector('#scenes').getSelected()); }, 800);
	});

	$transUp.click(function() {
		nodecg.sendMessage('ssbmDropOut');
	});

	function setToName(element, index, array) {
		array[index] = element.name;
	}

	function updateScenes(scenes) {
		// $('#ssbm-scenes').empty();
		// scenes.forEach(updateSelect);
		scenes.forEach(setToName);
		// console.log(scenes);
		document.querySelector('#scenes').setScenes(scenes);
	}
})();