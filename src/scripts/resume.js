'use strict';

module.exports = function(app, timer, localStorage, getMode){
	if (localStorage.mode) {
		app[localStorage.mode](localStorage.seconds);
	}

	timer.on('step', function(seconds){
		localStorage.seconds = seconds;
		localStorage.mode = getMode();
	});
};
