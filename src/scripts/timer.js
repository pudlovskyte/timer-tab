'use strict';

var $ = require('jquery');
var formatTime = require('./format-time');

var getCounterSize = function(seconds){
	if (seconds < 60) return 'big';
	if (seconds < 3600) return 'medium';
	return 'small';
};

var display = function(seconds, $counter){
	$counter.text(formatTime(seconds));
	$counter.attr('data-counter-size', getCounterSize(seconds));
};

module.exports = function(){

	var timer;
	var currentMode;
	var currentSeconds;

	var stop = function(){
		clearTimeout(timer);
	};

	var countdown = function(seconds, $counter){
		stop();
		currentMode = 'countdown';
		currentSeconds = seconds;
		display(seconds, $counter);
		if (seconds > 0) {
			timer = setTimeout(function(){
				countdown(seconds - 1, $counter);
			}, 1000);
		} else {
			$('.content').attr('data-alarm', '');
		}
	};

	var stopwatch = function(seconds, $counter){
		//seconds = seconds || 0;
		stop();
		currentMode = 'stopwatch';
		currentSeconds = seconds;
		display(seconds, $counter);
		timer = setTimeout(function(){
			stopwatch(seconds + 1, $counter);
		}, 1000);
	};

	var pause = function(){
		stop();
	};

	var resume = function($counter){
		if (!currentMode) return;
		var f = currentMode === 'countdown' ? countdown : stopwatch;
		f(currentSeconds, $counter);
	};

	return {
		countdown: countdown,
		stopwatch: stopwatch,
		pause: pause,
		resume: resume
	};
};
