'use strict';
/**
 * Business logic routes for working with organization.
 */

var express = require('express'),
    jefferson = require('express-jefferson'),
    conf = require('./routes'),
    app = express();

jefferson(app, conf);
module.exports = app;
