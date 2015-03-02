'use strict';

var calczoom = function($body, $target, window){
	var scale = window.innerWidth / $target.width();
	var targetPosition = window.innerWidth / 2 - ($target.width() / 2);
	var currentPosition = $target.offset().left;
	var translateX = targetPosition - currentPosition;
	return {
		scale: scale,
		translateX: translateX
	};
};

module.exports = function(window, $body){

	var zoom = function($target){
		var data = calczoom($body, $target, window);
		$body.css('transform',
			'scale(' + data.scale + ') translateX(' + data.translateX + 'px)');
	};

	var resetzoom = function(){
		$body.css('transform', '');
	};

	return {
		enable: zoom,
		reset: resetzoom
	};
};
