'use strict';

var $ = require('jquery');

var countdown = require('./scripts/countdown');
var userData = require('./scripts/user-data');

$('[data-target-mode]').on('click', function(){
	// Changing attribute to trigger CSS selector changes
	$('.content').attr(
		'data-mode',
		$(this).data('target-mode')
	);
});


$('form.countdown').on('submit', function(event){
	event.preventDefault();
	var t = userData.getInput($(event.target));
	countdown(3600*t.hours + 60*t.minutes + t.seconds);
});


$('form.alarmclock').on('submit', function(event){
	event.preventDefault();
	var now = new Date();
	var target = userData.getDate(now, $(event.target));
	countdown(Math.round((target - now) / 1000));

	$('.alarm-time').text(target.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}));
});
