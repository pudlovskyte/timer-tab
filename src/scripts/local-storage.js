'use strict';

module.exports = function($, window){
	// Wait a few ms to allow the change handlers to register
	setTimeout(function(){
		Object.keys(window.localStorage).forEach(function(key){
			var [formName, inputName] = key.split(' ');
			$('form[name="' + formName + '"] [name="' + inputName + '"]')
				.val(window.localStorage[key])
				.change();
		});
	}, 5);

	$('body').on('change', 'input', function(event){
		var $input = $(event.target);
		// Forms receive dynamic properties named after the names of its inputs
		// This means .prop('name') might unexpectedly return an <input name=name>,
		// while we need the actual name of the form itself. Thus, .attr.
		var key = $input.closest('form').attr('name') + ' ' + $input.prop('name');
		window.localStorage[key] = $input.val();
	});
};

