'use strict';

var userData = require('./user-data');
var getYoutubeIdFromUrl = require('./youtube-id-from-url');

module.exports = function($, app){
	$('[data-target-pause]').on('click', app.pause);
	$('[data-target-resume]').on('click', app.resume);
	$('[data-target-stop]').on('click', app.stop);

	$('body').on('keyup', function(event){
		if ($(event.target).is('a, input, textarea, button'))
			return;
		// 32 is the code for space. Spaaaace.
		if (event.keyCode !== 32)
			return;

		if (app.isPaused()) app.resume();
		else app.pause();
	});

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


	$('.settings-item.video input').on('change', function(event){
		app.changeYoutubeAlarm(
			getYoutubeIdFromUrl($(event.target).val()));
	});

	$('.settings-item.background input').on('change', function(event){
		app.changeBackground($(event.target).val());
	});

	$('.settings-item.name input').on('keyup change', function(event){
		app.changeName($(event.target).val());
	});


	$('.settings input').on('focus', function(){
		$('.settings-wrapper').addClass('pinned');
	});

	$('.settings input').on('blur', function(){
		$('.settings-wrapper').removeClass('pinned');
	});


	$('.counter').on('click', function(){
		if ($('body').hasClass('zoomed')) app.zoom.reset();
		else app.zoom();
	});
};
