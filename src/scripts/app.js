'use strict';

var resume = require('./resume');
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

	var setMode = function(mode){
		$('.content').attr('data-mode', mode);
	};

	var reset = function(){
		$('.content').removeAttr('data-timer-in-progress');
		$('.content').removeAttr('data-paused');
		$('.content').removeAttr('data-alarm');
		$('.alarm-video').remove();
	};

	var start = function(){
		reset();
		$('.content').attr('data-timer-in-progress', '');
	};

	timer.on('start', start);
	timer.on('step', timerDisplay);
	timer.on('end', turnOnAlarm);

	var app = {};

	resume(app, timer, window.localStorage, function(){
		return $('.content').attr('data-mode');
	});

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
		reset();
		timer.stop();
	};

	app.alarmclock = function(now, target){
		timer.countdown(Math.round((target - now) / 1000));
		setMode('alarmclock');
		$('.alarm-time').text(
			target.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'})
		);
	};

	app.countdown = function(seconds){
		timer.countdown(seconds);
		setMode('countdown');
	};

	app.stopwatch = function(){
		timer.stopwatch();
		setMode('stopwatch');
	};

	app.zoom = function(){
		$('body').addClass('zoomed');
		zoom.enable($('.timer-result'));
	};

	app.zoom.reset = function(){
		$('body').removeClass('zoomed');
		zoom.reset();
	};

	return app;
};
