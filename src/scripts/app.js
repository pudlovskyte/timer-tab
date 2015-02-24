'use strict';

var timerFactory = require('./timer');
var timerDisplayFactory = require('./timer-display');

module.exports = function($){

	var timer = timerFactory();
	var timerDisplay = timerDisplayFactory($('.counter'));

	timer.on('step', timerDisplay);
	timer.on('end', function(){
		$('.content').attr('data-alarm', '');
		$('<iframe>')
			.addClass('alarm-video')
			.prop(
				'src',
				'https://www.youtube.com/embed/3Be7fy1dx14?rel=0&controls=0&showinfo=0&autoplay=1'
			)
			.appendTo('.timer-result-wrapper');
	});

	var setMode = function(mode){
		$('.content').attr('data-mode', mode);
	};

	var start = function(){
		app.stop();
		$('.content').attr('data-timer-in-progress', '');
	};

	var app = {};

	app.pause = function(){
		$('.content').attr('data-paused', '');
		timer.pause();
	};

	app.resume = function(){
		$('.content').removeAttr('data-paused');
		timer.resume();
	};

	app.stop = function(){
		$('.content').removeAttr('data-timer-in-progress');
		$('.content').removeAttr('data-paused');
		$('.content').removeAttr('data-alarm');
		$('.alarm-video').remove();
		timer.stop();
	};

	app.alarmclock = function(now, target){
		start();
		timer.countdown(Math.round((target - now) / 1000));
		setMode('alarmclock');
		$('.alarm-time').text(
			target.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'})
		);
	};

	app.countdown = function(seconds){
		start();
		timer.countdown(seconds);
		setMode('countdown');
	};

	app.stopwatch = function(){
		start();
		timer.stopwatch();
		setMode('stopwatch');
	};

	return app;
};
