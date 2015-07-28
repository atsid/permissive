'use strict';

var chai = require('chai'),
    util = require('./util');

describe('Team model HTTP requests', function () {

    this.timeout(10000);

    describe('get', () => {
        let teams,
        statusCode;

        before((done) => {
            util.get('/teams').then((result) => {
                teams = JSON.parse(result.body);
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 200', () => {
            chai.assert.equal(statusCode, 200);
        });

        it('returns a lists of teams', () => {
            chai.assert.ok(teams.length > 0);
            chai.assert.ok(teams[0].id);
        });

        it('team has no links',  () => {
            chai.assert.isUndefined(teams[0].links);
        });
    });
});
