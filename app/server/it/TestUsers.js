'use strict';

var chai = require('chai'),
    util = require('./util');

describe('User model HTTP requests', () => {

    this.timeout(10000);

    describe('list', () => {

        let items,
            status;

        before((done) => {
            util.get('/users').then((result) => {
                items = JSON.parse(result.body);
                status = result.statusCode;
                done();
            });
        });

        it('returns a 200',  () => {
            chai.assert.equal(status, 200);
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
            status;

        before((done) => {
            util.get('/users?permission_repo=1').then((result) => {
                items = JSON.parse(result.body);
                status = result.statusCode;
                done();
            });
        });

        it('returns a 200',  () => {
            chai.assert.equal(status, 200);
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
            status;

        before((done) => {
            util.get('/users/testuser').then((result) => {
                item = JSON.parse(result.body);
                status = result.statusCode;
                done();
            });
        });

        it('returns a 200',  () => {
            chai.assert.equal(status, 200);
        });

        it('returns a user',  () => {
            chai.assert.ok(item.username);
        });

    });

    describe('editRepoPermission',  () => {

        let status;

        before((done) => {
            util.put('/users/testuser/repos/1/permissions/read').then((result) => {
                status = result.statusCode;
                done();
            });
        });

        it('returns a 204',  () => {
            chai.assert.equal(status, 204);
        });

    });

    describe('removeRepoPermission',  () => {

        let status;

        before((done) => {
            util.del('/users/testuser/repos/1').then((result) => {
                status = result.statusCode;
                done();
            });
        });

        it('returns a 204',  () => {
            chai.assert.equal(status, 204);
        });

    });

});
