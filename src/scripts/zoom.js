'use strict';

var calczoom = function($body, $target, window){
	var scale = window.innerWidth / $target.width();
	var targetX = window.innerWidth / 2 - ($target.width() / 2);
	var targetY = window.innerHeight / 2 - ($target.height() / 2);
	var {top, left} = $target.offset();
	var translateX = targetX - left;
	var translateY = targetY - top;
	return {
		scale: scale,
		translateX: translateX.toString() + 'px',
		translateY: translateY.toString() + 'px'
	};
};

module.exports = function(window, $body){

	var zoom = function($target){
		var transforms = calczoom($body, $target, window);
		$body.css('transform',
			Object.keys(transforms)
				.map(function(key){
					return key + '(' + transforms[key] + ')';
				})
				.join(' ')
		);
	};

	var resetzoom = function(){
		$body.css('transform', '');
	};

	return {
		enable: zoom,
		reset: resetzoom
	};
};
