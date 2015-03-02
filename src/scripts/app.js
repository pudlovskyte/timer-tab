'use strict';

var timerFactory = require('./timer');
var timerDisplayFactory = require('./timer-display');
var zoomFactory = require('./zoom.js');

module.exports = function($, window){

	var zoom = zoomFactory(window, $('body'));
	var timer = timerFactory();
	var timerDisplay = timerDisplayFactory($('.counter'));

	var youtubeAlarmId = '3Be7fy1dx14';

	var turnOnAlarm = function(){
		$('.content').attr('data-alarm', '');
		$('<iframe>')
			.addClass('alarm-video')
			.prop(
				'src',
				'https://www.youtube.com/embed/' +
					encodeURIComponent(youtubeAlarmId) +
					'?rel=0&controls=0&showinfo=0&autoplay=1'
			)
			.appendTo('.timer-result-wrapper');
	};

	timer.on('step', timerDisplay);
	timer.on('end', turnOnAlarm);

	var setMode = function(mode){
		$('.content').attr('data-mode', mode);
	};

	var start = function(){
		app.stop();
		$('.content').attr('data-timer-in-progress', '');
	};

	var app = {};

	app.changeYoutubeAlarm = function(id){
		youtubeAlarmId = id;
	};

	app.changeBackground = function(url){
		$('body').css(
			'background-image',
			url ? 'url("' + url.replace(/"/g, '\\"') + '")' : 'none'
		);
	};

	app.changeName = function(name){
		$('.timer-name').text(name);
	};

	app.isPaused = function(){
		return $('.content').is('[data-paused]');
	};

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

	app.zoom = function(){
		$('body').addClass('zoomed');
		zoom.enable($('.counter'));
	};

	app.zoom.reset = function(){
		$('body').removeClass('zoomed');
		zoom.reset();
	};

	return app;
};
