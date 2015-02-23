'use strict';

var $ = require('jquery');

var app = require('./scripts/app')($);
var uiEvents = require('./scripts/ui-events');

uiEvents($, app);

app.stopwatch();
