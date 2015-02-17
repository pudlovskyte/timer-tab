'use strict';

var $ = require('jquery');

var timer = require('./scripts/timer');
var userData = require('./scripts/user-data');

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


$('form.countdown').on('submit', function(event){
	event.preventDefault();
	$('.content').removeAttr('data-paused');
	var t = userData.getInput($(event.target));
	timer.countdown(3600*t.hours + 60*t.minutes + t.seconds);
});


$('form.alarmclock').on('submit', function(event){
	event.preventDefault();
	$('.content').removeAttr('data-paused');
	var now = new Date();
	var target = userData.getDate(now, $(event.target));
	timer.countdown(Math.round((target - now) / 1000));

	$('.alarm-time').text(target.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}));
});


$('form.stopwatch').on('submit', function(event){
	event.preventDefault();
	$('.content').removeAttr('data-paused');
	timer.stopwatch();
});
