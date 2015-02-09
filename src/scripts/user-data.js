'use strict';

var getInput = function($form){
	return {
		hours: Number($form.find('.hours input').val()),
		minutes: Number($form.find('.minutes input').val()),
		seconds: Number($form.find('.seconds input').val())
	};
};

var getDate = function(now, $form){
	var input = getInput($form);

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

module.exports = {getInput: getInput, getDate: getDate};
