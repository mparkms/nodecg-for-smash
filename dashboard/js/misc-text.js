(function() {
	'use strict';

	window.addEventListener('WebComponentsReady', function(e) {
		var $topUpdate = $('.ssbm-top-update');
		var $topUpdateAnim = $('.ssbm-top-update-anim');
		var $sendTopMessage = $('.ssbm-top-message');
		var $playercamUpdate = $('.ssbm-playercam-update');
		var $lowerThirdUpdate = $('.ssbm-third-update');
		var $lowerThirdUpdateAnim = $('.ssbm-third-update-anim');

		$topUpdate.click(function() {
			nodecg.sendMessage('ssbmTopUpdate', topPanelData(false));
		});

		$topUpdateAnim.click(function() {
			nodecg.sendMessage('ssbmTopUpdateAnim', topPanelData(true));
		});

		$sendTopMessage.click(function() {
			nodecg.sendMessage('ssbmTopMessage', $('#ssbm-message-text').val());
		});

		$playercamUpdate.click(function() {
			nodecg.sendMessage('ssbmPlayercam', $('#ssbm-playercam-text').val());
		});

		$lowerThirdUpdate.click(function() {
			nodecg.sendMessage('lowerThirdUpdate', lowerThirdData());
		});

		$lowerThirdUpdateAnim.click(function() {
			nodecg.sendMessage('lowerThirdUpdateAnim', lowerThirdData());
		});

		function topPanelData(anim) {
			return {
				'panel1text': $('#ssbm-top-panel1text').val(),
				'panel2text': $('#ssbm-top-panel2text').val()
			};
		}

		function lowerThirdData() {
			return {
				'top': $('#ssbm-third-top-text').val(),
				'bottom': $('#ssbm-third-bottom-text').val()
			}
		}
	});
})();