'use strict';

module.exports = function(url){
	var code = '([0-9a-zA-Z]{5,15})';
	var codeRegexp = new RegExp([
		'youtube\\.com/.*(?:v=|embed/)' + code,
		'youtu\\.be/' + code
	].join('|'));

	var match = url.match(codeRegexp);

	if (!match) return;
	return match[1] || match[2];
};
