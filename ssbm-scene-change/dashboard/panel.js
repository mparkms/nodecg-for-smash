'use strict';

var $panel = $bundle.filter('.ssbm-scene-change');

// var OBSRemote = require('obs-remote');
// var obs = new OBSRemote();
// obs.connect('localhost');

var $sceneUpdate = $panel.find('.ssbm-scene-update');
var $changeNoTrans = $panel.find('.ssbm-scene-change-no-trans');
var $changeTrans = $panel.find('.ssbm-scene-change-trans');
var $changeTransDown = $panel.find('.ssbm-scene-change-trans-down');
var $transUp = $panel.find('.ssbm-trans-up');

$sceneUpdate.click(function() {
	nodecg.sendMessage('ssbmScenesUpdate', 0, function(result) {
		updateScenes(result);
	});
});

$changeNoTrans.click(function() {
	nodecg.sendMessage('ssbmSceneChange', $('#ssbm-scenes').val());
});

$changeTrans.click(function() {
	nodecg.sendMessage('ssbmDropIn');
	setTimeout(function() {	nodecg.sendMessage('ssbmSceneChange', $('#ssbm-scenes').val()); }, 800);
	setTimeout(function() { nodecg.sendMessage('ssbmDropOut'); }, 1000);
});

$changeTransDown.click(function() {
	nodecg.sendMessage('ssbmDropIn');
	setTimeout(function() {	nodecg.sendMessage('ssbmSceneChange', $('#ssbm-scenes').val()); }, 800);
});

$transUp.click(function() {
	nodecg.sendMessage('ssbmDropOut');
});

function updateSelect(element, index, array) {
	var option = $('<option></option>').attr("value", element.name).text(element.name);
	$('#ssbm-scenes').append(option);
}

function updateScenes(scenes) {
	$('#ssbm-scenes').empty();
	scenes.forEach(updateSelect);
}