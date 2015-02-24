'use strict';

module.exports = function($element){

	var showTime = function(){
		var now = new Date();

		$element.text(
			now.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'})
		);
	};

	showTime();
	setInterval(showTime, 1000);
};
