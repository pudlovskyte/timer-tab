'use strict';

var pad = function(number){
	if (number > 9) return number;
	return '0' + number;
};

module.exports = function(seconds){
	var hours = Math.floor(seconds / 3600);
	var minutes = Math.floor((seconds % 3600) / 60);
	var secs = seconds % 60;
	return (hours > 0 ? pad(hours) + ':' : '') +
		(hours > 0 || minutes > 0 ? pad(minutes) + ':' : '') +
		pad(secs);
};
