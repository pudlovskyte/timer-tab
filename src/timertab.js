'use strict';

var $ = require('jquery');

var timer = require('./scripts/timer')();
var timerDisplay = require('./scripts/timer-display')($('.counter'));
var userData = require('./scripts/user-data');

var onEnd = function(){
	$('.content').attr('data-alarm', '');
};

$('.content').attr('data-timer-in-progress', '');
timer.stopwatch(0, timerDisplay);

$('[data-target-mode]').on('click', function(){
	// Changing attribute to trigger CSS selector changes
	$('.content').attr(
		'data-mode',
		$(this).data('target-mode')
	);
});

$('[data-target-pause]').on('click', function(){
	// Changing attribute to trigger CSS selector changes
	$('.content').attr('data-paused', '');
	timer.pause();
});

$('[data-target-resume]').on('click', function(){
	// Changing attribute to trigger CSS selector changes
	$('.content').removeAttr('data-paused');
	timer.resume(timerDisplay, onEnd);
});

$('[data-target-stop]').on('click', function(){
	// Changing attribute to trigger CSS selector changes
	$('.content').removeAttr('data-timer-in-progress');
	$('.content').removeAttr('data-alarm');
});


$('form.countdown').on('submit', function(event){
	event.preventDefault();
	$('.content').attr('data-timer-in-progress', '');
	$('.content').removeAttr('data-paused');
	$('.content').removeAttr('data-alarm');
	var t = userData.getInput($(event.target));
	timer.countdown(
		3600*t.hours + 60*t.minutes + t.seconds,
		timerDisplay,
		onEnd);
});


$('form.alarmclock').on('submit', function(event){
	event.preventDefault();
	$('.content').attr('data-timer-in-progress', '');
	$('.content').removeAttr('data-paused');
	$('.content').removeAttr('data-alarm');
	var now = new Date();
	var target = userData.getDate(now, $(event.target));
	timer.countdown(
		Math.round((target - now) / 1000),
		timerDisplay,
		onEnd);

	$('.alarm-time').text(target.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}));
});


$('form.stopwatch').on('submit', function(event){
	event.preventDefault();
	$('.content').attr('data-timer-in-progress', '');
	$('.content').removeAttr('data-paused');
	$('.content').removeAttr('data-alarm');
	timer.stopwatch(0, timerDisplay);
});
