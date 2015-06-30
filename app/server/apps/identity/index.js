'use strict';
/**
 * Business logic routes for working with identity.
 */

var express = require('express'),
    jefferson = require('express-jefferson'),
    conf = require('./routes'),
    app = express();

jefferson(app, conf);
module.exports = app;
