'use strict';

var chai = require('chai'),
    util = require('./util');

describe('Organization model HTTP requests', function () {

    this.timeout(10000);

    describe('get', () => {
        let org,
        statusCode;

        before((done) => {
            util.get('/organization').then((result) => {
                org = JSON.parse(result.body);
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 200', () => {
            chai.assert.equal(statusCode, 200);
        });

        it('returns a data structure representation of the org chart', () => {
            chai.assert.ok(org.users);
        });

        it('organization has no links', () => {
            chai.assert.isUndefined(org.links);
        });
    });
});
