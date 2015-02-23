'use strict';

var userData = require('./user-data');

module.exports = function($, app){
	$('[data-target-pause]').on('click', app.pause);
	$('[data-target-resume]').on('click', app.resume);
	$('[data-target-stop]').on('click', app.stop);

	$('form.countdown').on('submit', function(event){
		event.preventDefault();
		var t = userData.getInput($(event.target));
		app.countdown(3600*t.hours + 60*t.minutes + t.seconds);
	});

	$('form.alarmclock').on('submit', function(event){
		event.preventDefault();
		var now = new Date();
		var target = userData.getDate(now, $(event.target));
		app.alarmclock(now, target);
	});

	$('form.stopwatch').on('submit', function(event){
		event.preventDefault();
		app.stopwatch();
	});
};
