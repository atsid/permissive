'use strict';

let chai = require('chai'),
    util = require('./util');

describe('Repo model HTTP requests', function () {

    this.timeout(10000);

    describe('list', () => {

        let items,
            statusCode;

        before((done) => {
            util.get('/repos').then((result) => {
                items = JSON.parse(result.body);
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 200', () => {
            chai.assert.equal(statusCode, 200);
        });

        it('returns at least one repo', () => {
            chai.assert.ok(items.length > 0);
            chai.assert.ok(items[0].id);
        });

        it('repo has no links', () => {
            chai.assert.isUndefined(items[0].links);
        });

    });

    describe('list?permission_user={user}', () => {

        let items,
            statusCode;

        before((done) => {
            util.get('/repos?permission_user=testuser1').then((result) => {
                items = JSON.parse(result.body);
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 200', () => {
            chai.assert.equal(statusCode, 200);
        });

        it('returns at least one repo', () => {
            chai.assert.ok(items.length > 0);
            chai.assert.ok(items[0].id);
        });

        it('repo has links', () => {
            chai.assert.ok(items[0].links.length > 0);
        });

    });

    describe('pull', () => {

        let item,
            statusCode;

        before((done) => {
            util.get('/repos/1').then((result) => {
                item = JSON.parse(result.body);
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 200', () => {
            chai.assert.equal(statusCode, 200);
        });

        it('returns a repo', () => {
            chai.assert.ok(item.id);
        });

    });

    describe('editUserPermission', () => {

        let statusCode;

        before((done) => {
            util.put('/repos/1/users/testuser1/permissions/pull').then((result) => {
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 204', () => {
            chai.assert.equal(statusCode, 204);
        });

    });

    describe('removeUserPermission', () => {

        let statusCode;

        before((done) => {
            util.del('/repos/1/users/testuser1').then((result) => {
                statusCode = result.statusCode;
                done();
            });
        });

        it('returns a 204', () => {
            chai.assert.equal(statusCode, 204);
        });

    });

});
