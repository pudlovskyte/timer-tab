'use strict';

var $ = require('jquery');

var countdown = require('./scripts/countdown');

$('[data-target-mode]').on('click', function(){
	// Changing attribute to trigger CSS selector changes
	$('.content').attr(
		'data-mode',
		$(this).data('target-mode')
	);
});

var getUserInput = function($form){
	return {
		hours: Number($form.find('.hours input').val()),
		minutes: Number($form.find('.minutes input').val()),
		seconds: Number($form.find('.seconds input').val())
	};
};

$('form.countdown').on('submit', function(event){
	event.preventDefault();
	var t = getUserInput($(event.target));
	countdown(3600*t.hours + 60*t.minutes + t.seconds);
});

var getUserDate = function(now, $form){
	var input = getUserInput($form);

	var target = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		input.hours,
		input.minutes,
		input.seconds
	);

	if (target < now) {
		return new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + 1,
			input.hours,
			input.minutes,
			input.seconds
		);
	}

	return target;
};

$('form.alarmclock').on('submit', function(event){
	event.preventDefault();
	var now = new Date();
	var target = getUserDate(now, $(event.target));
	countdown(Math.round((target - now) / 1000));

	$('.alarm-time').text(target.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}));
});
