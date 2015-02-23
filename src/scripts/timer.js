'use strict';

var EventEmitter = require('events').EventEmitter;

module.exports = function(){
	var ee = new EventEmitter();

	var timer;
	var currentMode;
	var currentSeconds;

	var stop = function(){
		clearTimeout(timer);
	};

	var countdown = function(seconds){
		stop();
		currentMode = 'countdown';
		currentSeconds = seconds;
		ee.emit('step', seconds);
		if (seconds > 0) {
			timer = setTimeout(function(){
				countdown(seconds - 1);
			}, 1000);
		} else {
			ee.emit('end');
		}
	};

	var stopwatch = function(seconds){
		seconds = seconds || 0;
		stop();
		currentMode = 'stopwatch';
		currentSeconds = seconds;
		ee.emit('step', seconds);
		timer = setTimeout(function(){
			stopwatch(seconds + 1);
		}, 1000);
	};

	var pause = function(){
		stop();
	};

	var resume = function(){
		if (currentMode === 'countdown') countdown(currentSeconds);
		if (currentMode === 'stopwatch') stopwatch(currentSeconds);
	};

	return {
		countdown: countdown,
		stopwatch: stopwatch,
		pause: pause,
		resume: resume,
		on: ee.on.bind(ee)
	};
};
