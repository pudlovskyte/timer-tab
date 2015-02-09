'use strict';

var $ = require('jquery');

var formatTime = require('./format-time');

var timer;

var display = function(seconds){
	$('.counter').text(formatTime(seconds));
};

var stop = function(){
	clearTimeout(timer);
};

var countdown = function(seconds){
	stop();
	display(seconds);
	if (seconds > 0) {
		timer = setTimeout(function(){
			countdown(seconds - 1);
		}, 1000);
	} else {

	}
};

var stopwatch = function(seconds){
	seconds = seconds || 0;
	stop();
	display(seconds);
	timer = setTimeout(function(){
		stopwatch(seconds + 1);
	}, 1000);
};

module.exports = {countdown: countdown, stopwatch: stopwatch};
