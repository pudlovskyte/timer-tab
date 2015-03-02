'use strict';

var $ = require('jquery');
var window = global.window;

var storage = require('./scripts/local-storage');
var app = require('./scripts/app')($, window);
var uiEvents = require('./scripts/ui-events');
var clock = require('./scripts/clock');

storage($, window);

uiEvents($, app);

clock($('.clock'));

app.stopwatch();

