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

        it('user has links',  () => {
            chai.assert.ok(items[0].links.length > 0);
        });

    });

    describe('read',  () => {

        let item,
            statusCode;

        before((done) => {
            util.get('/users/testuser1').then((result) => {
                item = JSON.parse(result.body);
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 200',  () => {
            chai.assert.equal(statusCode, 200);
        });

        it('returns a user',  () => {
            chai.assert.ok(item.username);
        });

    });

    describe('editRepoPermission',  () => {

        let statusCode;

        before((done) => {
            util.put('/users/testuser1/repos/1/permissions/read').then((result) => {
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 204',  () => {
            chai.assert.equal(statusCode, 204);
        });

    });

    describe('removeRepoPermission',  () => {

        let statusCode;

        before((done) => {
            util.del('/users/testuser1/repos/1').then((result) => {
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 204',  () => {
            chai.assert.equal(statusCode, 204);
        });

    });

});
