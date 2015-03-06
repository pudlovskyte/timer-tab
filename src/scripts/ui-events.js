'use strict';

var userData = require('./user-data');
var getYoutubeIdFromUrl = require('./youtube-id-from-url');

module.exports = function($, app){
	$('body').on('click', '[data-target-pause]', app.pause);
	$('body').on('click', '[data-target-resume]', app.resume);
	$('body').on('click', '[data-target-stop]', app.stop);

	$('body').on('keyup', 'body', function(event){
		if ($(event.target).is('a, input, textarea, button'))
			return;
		// 32 is the code for space. Spaaaace.
		if (event.keyCode !== 32)
			return;

		if (app.isPaused()) app.resume();
		else app.pause();
	});

	$('body').on('submit', 'form.countdown', function(event){
		event.preventDefault();
		var t = userData.getInput($(event.target));
		app.countdown(3600*t.hours + 60*t.minutes + t.seconds);
	});

	$('body').on('submit', 'form.alarmclock', function(event){
		event.preventDefault();
		var now = new Date();
		var target = userData.getDate(now, $(event.target));
		app.alarmclock(now, target);
	});

	$('body').on('submit', 'form.stopwatch', function(event){
		event.preventDefault();
		app.stopwatch();
	});


	$('body').on('change', '.settings-item.video input', function(event){
		app.changeYoutubeAlarm(
			getYoutubeIdFromUrl($(event.target).val()));
	});

	$('body').on('change', '.settings-item.background input', function(event){
		app.changeBackground($(event.target).val());
	});

	$('body').on('keyup change', '.settings-item.name input', function(event){
		app.changeName($(event.target).val());
	});


	$('body').on('focus', '.settings input', function(){
		$('.settings-wrapper').addClass('pinned');
	});

	$('body').on('blur', '.settings input', function(){
		$('.settings-wrapper').removeClass('pinned');
	});


	$('body').on('click', '.counter', function(){
		if ($('body').hasClass('zoomed')) app.zoom.reset();
		else app.zoom();
	});
};
