'use strict';

var calczoom = function($body, $target, window){
	var scale = Math.min(
		window.innerWidth / $target.width(),
		window.innerHeight / $target.height()
	);
	var targetX = window.innerWidth / 2 - ($target.width() / 2);
	var targetY = window.innerHeight / 2 - ($target.height() / 2);
	var {top, left} = $target.offset();
	// Multiplying translates by scale is confusing
	// The action has been determined by experimentation.
	// It seems the browsers apply scale first and the px values for translate
	// become scaled with it.
	// Given that it would seem we can avoid the scaling issue by changing the
	// order of translates and scale, and it does. However, then our transitioning
	// follows a strange parabole-like trajectory, the cause of which is, insofar,
	// unknown.
	var translateX = (targetX - left) * scale;
	var translateY = (targetY - top) * scale;

	// The order of these matter, thus we return a list instead of an object.
	return [
		{key: 'translateX', value: translateX.toString() + 'px'},
		{key: 'translateY', value: translateY.toString() + 'px'},
		{key: 'scale', value: scale.toString()}
	];
};

module.exports = function(window, $body){

	var zoom = function($target){
		// Save transition to restore later
		var transition = $body.css('transition');

		// If we are in the middle of a transition when we compute zoom,
		// we get unexpected positioning values and compute zoom towards a wrong
		// position.
		// To work around that, we disable all body transitions for a moment,
		// the body snaps to the correct position, and we calculate zoom
		// based on that, which will be correct.
		// We later restore the transition as soon as we can.
		$body.css('transition', 'none');

		var transforms = calczoom($body, $target, window);

		$body.css('transition', transition);

		$body.css('transform',
			transforms
				.map(function(transform){
					return transform.key + '(' + transform.value + ')';
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
