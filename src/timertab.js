'use strict';

var $ = require('jquery');

var timer = require('./scripts/timer');
var userData = require('./scripts/user-data');

$('.content').attr('data-timer-in-progress', '');
timer.stopwatch();

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
	timer.resume();
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
	timer.countdown(3600*t.hours + 60*t.minutes + t.seconds);
});


$('form.alarmclock').on('submit', function(event){
	event.preventDefault();
	$('.content').attr('data-timer-in-progress', '');
	$('.content').removeAttr('data-paused');
	$('.content').removeAttr('data-alarm');
	var now = new Date();
	var target = userData.getDate(now, $(event.target));
	timer.countdown(Math.round((target - now) / 1000));

	$('.alarm-time').text(target.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}));
});


$('form.stopwatch').on('submit', function(event){
	event.preventDefault();
	$('.content').attr('data-timer-in-progress', '');
	$('.content').removeAttr('data-paused');
	$('.content').removeAttr('data-alarm');
	timer.stopwatch();
});
