'use strict';
var auth = require('../../middleware/authenticate'),
    routeGenerator = require('../../route-generator'),
    names = require('./names'),
    middlewares = require('./middlewares');

module.exports = {
    pre: {
        all: [auth.isAuthenticated]
    },
    routes: routeGenerator(names, middlewares)
};
