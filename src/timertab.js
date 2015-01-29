'use strict';

var $ = require('jquery');

$('[data-target-mode]').on('click', function(){
	// Changing attribute to trigger CSS selector changes
	$('.content').attr(
		'data-mode',
		$(this).data('target-mode')
	);
});

var pad = function(number){
	if (number > 9) return number;
	return '0' + number;
};

var formatTime = function(seconds){
	var hours = Math.floor(seconds / 3600);
	var minutes = Math.floor((seconds % 3600) / 60);
	var secs = seconds % 60;
	return (hours > 0 ? pad(hours) + ':' : '') +
		(hours > 0 || minutes > 0 ? pad(minutes) + ':' : '') +
		pad(secs);
};

var display = function(seconds){
	$('.counter').text(formatTime(seconds));
};


var countdown = (function(){
	var timer;

	var stop = function(){
		clearTimeout(timer);
	};

	return {
		start: function(seconds){
			stop();
			display(seconds);
			if (seconds > 0) {
				timer = setTimeout(function(){
					countdown.start(seconds - 1);
				}, 1000);
			} else {

			}
		}
	};
})();


var getTime = function(form){
	var hours = Number($(form).find('.hours input').val());
	var minutes = Number($(form).find('.minutes input').val());
	var seconds = Number($(form).find('.seconds input').val());
	return 3600*hours + 60*minutes + seconds;
};


var f = function(event){
	event.preventDefault();
	countdown.start(getTime($(this)));
};




$('form.countdown').on('submit', f);
