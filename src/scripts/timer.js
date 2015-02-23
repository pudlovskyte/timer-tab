'use strict';

var $ = require('jquery');
var formatTime = require('./format-time');

var getCounterSize = function(seconds){
	if (seconds < 60) return 'big';
	if (seconds < 3600) return 'medium';
	return 'small';
};

var display = function($counter, seconds){
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

	var countdown = function(seconds){
		stop();
		currentMode = 'countdown';
		currentSeconds = seconds;
		display($('.counter'), seconds);
		if (seconds > 0) {
			timer = setTimeout(function(){
				countdown(seconds - 1);
			}, 1000);
		} else {
			$('.content').attr('data-alarm', '');
		}
	};

	var stopwatch = function(seconds){
		seconds = seconds || 0;
		stop();
		currentMode = 'stopwatch';
		currentSeconds = seconds;
		display($('.counter'), seconds);
		timer = setTimeout(function(){
			stopwatch(seconds + 1);
		}, 1000);
	};

	var pause = function(){
		stop();
	};

	var resume = function(){
		if (!currentMode) return;
		var f = currentMode === 'countdown' ? countdown : stopwatch;
		f(currentSeconds);
	};

	return {
		countdown: countdown,
		stopwatch: stopwatch,
		pause: pause,
		resume: resume
	};
};
