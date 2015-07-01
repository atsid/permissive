'use strict';

var chai = require('chai'),
    util = require('./util');

describe('Identity model HTTP requests', function () {

    this.timeout(10000);

    describe('get', () => {
        let user,
            statusCode;

        before((done) => {
           util.get('/identity').then((result) => {
                user = JSON.parse(result.body);
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 200', () => {
            chai.assert.equal(statusCode, 200);
        });

        it('returns the authenticated user', () => {
            chai.assert.ok(user.username);
        });

        it('user has no links', () => {
            chai.assert.isUndefined(user.links);
        });
    });

});
