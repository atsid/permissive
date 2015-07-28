'use strict';
var auth = require('../../middleware/authenticate'),
    routeGenerator = require('../../route-generator'),
    methods = require('./methods'),
    middlewares = require('./middlewares');

module.exports = {
    pre: {
        all: [auth.isAuthenticated]
    },
    routes: routeGenerator(methods, middlewares)
};
