'use strict';

let chai = require('chai'),
    util = require('./util');

describe('Repo model HTTP requests', () => {

    this.timeout(10000);

    describe('list', () => {

        let items,
            status;

        before((done) => {
            util.get('/repos').then((result) => {
                items = JSON.parse(result.body);
                status = result.statusCode;
                done();
            });
        });

        it('returns a 200', () => {
            chai.assert.equal(status, 200);
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
            status;

        before((done) => {
            util.get('/repos?permission_user=testuser').then((result) => {
                items = JSON.parse(result.body);
                status = result.statusCode;
                done();
            });
        });

        it('returns a 200', () => {
            chai.assert.equal(status, 200);
        });

        it('returns at least one repo', () => {
            chai.assert.ok(items.length > 0);
            chai.assert.ok(items[0].id);
        });

        it('repo has links', () => {
            chai.assert.ok(items[0].links.length > 0);
        });

    });

    describe('read', () => {

        let item,
            status;

        before((done) => {
            util.get('/repos/1').then((result) => {
                item = JSON.parse(result.body);
                status = result.statusCode;
                done();
            });
        });

        it('returns a 200', () => {
            chai.assert.equal(status, 200);
        });

        it('returns a repo', () => {
            chai.assert.ok(item.id);
        });

    });

    describe('editUserPermission', () => {

        let status;

        before((done) => {
            util.put('/repos/1/users/testuser/permissions/read').then((result) => {
                status = result.statusCode;
                done();
            });
        });

        it('returns a 204', () => {
            chai.assert.equal(status, 204);
        });

    });

    describe('removeUserPermission', () => {

        let status;

        before((done) => {
            util.del('/repos/1/users/testuser').then((result) => {
                status = result.statusCode;
                done();
            });
        });

        it('returns a 204', () => {
            chai.assert.equal(status, 204);
        });

    });

});
