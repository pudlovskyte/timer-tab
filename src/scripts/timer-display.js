'use strict';

var formatTime = require('./format-time');

var getCounterSize = function(seconds){
	if (seconds < 60) return 'big';
	if (seconds < 3600) return 'medium';
	return 'small';
};

module.exports = function($counter){

	var display = function(seconds){
		$counter.text(formatTime(seconds));
		$counter.attr('data-counter-size', getCounterSize(seconds));
	};

	return display;
};
