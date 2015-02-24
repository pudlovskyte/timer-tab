'use strict';

var $ = require('jquery');

var app = require('./scripts/app')($);
var uiEvents = require('./scripts/ui-events');
var clock = require('./scripts/clock');

uiEvents($, app);

clock($('.clock'));

app.stopwatch();

