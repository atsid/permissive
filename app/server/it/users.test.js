'use strict';

var chai = require('chai'),
    util = require('./util');

describe('User model HTTP requests', function () {

    this.timeout(10000);

    describe('list', () => {

        let items,
            statusCode;

        before((done) => {
            util.get('/users').then((result) => {
                items = JSON.parse(result.body);
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 200',  () => {
            chai.assert.equal(statusCode, 200);
        });

        it('returns at least one user',  () => {
            chai.assert.ok(items.length > 0);
            chai.assert.ok(items[0].username);
        });

        it('user has no links',  () => {
            chai.assert.isUndefined(items[0].links);
        });

    });

    describe('list?permission_repo={repo}',  () => {

        let items,
            statusCode;

        before((done) => {
            util.get('/users?permission_repo=1').then((result) => {
                items = JSON.parse(result.body);
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 200',  () => {
            chai.assert.equal(statusCode, 200);
        });

        it('returns at least one user',  () => {
            chai.assert.ok(items.length > 0);
            chai.assert.ok(items[0].username);
        });

        //mock user is testuser3, who has admin permission
        it('user has links', () => {
            chai.assert.ok(items[0].links);
        });

    });

    describe('editRepoPermission',  () => {

        let statusCode;

        before((done) => {
            util.put('/users/testuser1/repos/1/permissions/pull').then((result) => {
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 204',  () => {
            chai.assert.equal(statusCode, 204);
        });

    });

});
