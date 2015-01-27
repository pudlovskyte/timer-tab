$('.countdown .timer-button.start').on('click', function(){
	$('.content').attr('data-mode', 'countdown');

});

$('.alarmclock .timer-button.start').on('click', function(){
	$('.content').attr('data-mode', 'alarmclock');

});

$('.stopwatch .timer-button.start').on('click', function(){
	$('.content').attr('data-mode', 'stopwatch');

});

