'use strict';

var chai = require('chai'),
    express = require('express'),
    wire = require('../wire');

//helper to find a valid route within the Routers
//express provides some defaults, so we need to find one with a valid route
function findRoute(app) {

    var route;

    // jscs:disable disallowDanglingUnderscores
    app._router.stack.some(function (router) {
        if (router.route) {
            route = router.route;
            return true;
        }
    });

    return route;
}

describe('wire.js', function () {

    it('wire creates successful express app from valid route config', function () {

        var config = {
            method: 'GET',
            path: '/test-path',
            middleware: [function (req, res, next) {}]
        },
            subapp = wire([config]),
            route = findRoute(subapp);

        chai.assert.equal('/test-path', route.path);
        chai.assert.equal('get', route.stack[0].method);

    });

});
