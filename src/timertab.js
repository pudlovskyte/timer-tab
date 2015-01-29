'use strict';

var $ = require('jquery');

var countdown = require('./countdown');

$('[data-target-mode]').on('click', function(){
	// Changing attribute to trigger CSS selector changes
	$('.content').attr(
		'data-mode',
		$(this).data('target-mode')
	);
});

var getTime = function(form){
	var hours = Number($(form).find('.hours input').val());
	var minutes = Number($(form).find('.minutes input').val());
	var seconds = Number($(form).find('.seconds input').val());
	return 3600*hours + 60*minutes + seconds;
};

var f = function(event){
	event.preventDefault();
	countdown(getTime($(this)));
};

$('form.countdown').on('submit', f);
