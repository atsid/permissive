'use strict';

let chai = require('chai'),
    wire = require('../wire');

//helper to find a valid route within the Routers
//express provides some defaults, so we need to find one with a valid route
function findRoute(app) {

    let route;

    // jscs:disable disallowDanglingUnderscores
    app._router.stack.some((router) => {
        if (router.route) {
            route = router.route;
            return true;
        }
    });

    return route;
}

describe('wire.js', () => {

    it('wire creates successful express app from valid route config', () => {

        let config = {
            method: 'GET',
            path: '/test-path',
            middleware: [function () {}]
        },
            subapp = wire([config]),
            route = findRoute(subapp);

        chai.assert.equal(route.path, '/test-path');
        chai.assert.equal(route.stack[0].method, 'get');

    });

    it('wire fails to create express app if route config method is missing', () => {

        let config = {
            path: '/test-path',
            middleware: [function () {}]
        };

        chai.assert.throws(() => {
            wire([config]);
        });

    });

    it('wire fails to create express app if route config path is missing', () => {

        let config = {
            method: 'GET',
            middleware: [function () {}]
        };

        chai.assert.throws(() => {
            wire([config]);
        });

    });

    it('wire fails to create express app if route config middleware is missing', () => {

        let config = {
            method: 'GET',
            path: '/test-path'
        };

        chai.assert.throws(() => {
            wire([config]);
        });

    });

});
