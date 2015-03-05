'use strict';
/**
 * Simple wiring function to create Express app instances given a route config.
 * Config looks like:
 * {
 *   <business method name>: {
 *      method: <method>,
 *      path: <path>,
 *      middleware: <array of middleware>
 *   }
 * }
 */
module.exports = (routes) => {

    var express = require('express'),
        app = express();

    Object.keys(routes).forEach((name) => {
        var route = routes[name];
        app[route.method.toLowerCase()](route.path, route.middleware);
    });

    return app;

};
