'use strict';

module.exports = function(){

	var timer;
	var currentMode;
	var currentSeconds;

	var stop = function(){
		clearTimeout(timer);
	};

	var countdown = function(seconds, callback, onEnd){
		stop();
		currentMode = 'countdown';
		currentSeconds = seconds;
		callback(seconds);
		if (seconds > 0) {
			timer = setTimeout(function(){
				countdown(seconds - 1, callback, onEnd);
			}, 1000);
		} else {
			onEnd();
		}
	};

	var stopwatch = function(seconds, callback){
		//seconds = seconds || 0;
		stop();
		currentMode = 'stopwatch';
		currentSeconds = seconds;
		callback(seconds);
		timer = setTimeout(function(){
			stopwatch(seconds + 1, callback);
		}, 1000);
	};

	var pause = function(){
		stop();
	};

	var resume = function(callback, onEnd){
		if (currentMode === 'countdown') countdown(currentSeconds, callback, onEnd);
		if (currentMode === 'stopwatch') stopwatch(currentSeconds, callback);
	};

	return {
		countdown: countdown,
		stopwatch: stopwatch,
		pause: pause,
		resume: resume
	};
};
