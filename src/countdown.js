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

var start = function(seconds){
	stop();
	display(seconds);
	if (seconds > 0) {
		timer = setTimeout(function(){
			start(seconds - 1);
		}, 1000);
	} else {

	}
};

module.exports = {
	start: start
};
