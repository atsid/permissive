'use strict';

var chai = require('chai'),
    util = require('./util');

describe('Repo model HTTP requests', function () {

    this.timeout(10000);

    describe('list', function () {

        var items,
            status;

        before(function (done) {
            util.get('/repos').then(function (result) {
                items = JSON.parse(result.body);
                status = result.statusCode;
                done();
            });
        });

        it('returns a 200', function () {
            chai.assert.equal(status, 200);
        });

        it('returns at least one repo', function () {
            chai.assert.ok(items.length > 0);
            chai.assert.ok(items[0].id);
        });

        it('repo has no links', function () {
            chai.assert.isUndefined(items[0].links);
        });

    });

    describe('list?permission_user={user}', function () {

        var items,
            status;

        before(function (done) {
            util.get('/repos?permission_user=testuser').then(function (result) {
                items = JSON.parse(result.body);
                status = result.statusCode;
                done();
            });
        });

        it('returns a 200', function () {
            chai.assert.equal(status, 200);
        });

        it('returns at least one repo', function () {
            chai.assert.ok(items.length > 0);
            chai.assert.ok(items[0].id);
        });

        it('repo has links', function () {
            chai.assert.ok(items[0].links.length > 0);
        });

    });

    describe('read', function () {

        var item,
            status;

        before(function (done) {
            util.get('/repos/1').then(function (result) {
                item = JSON.parse(result.body);
                status = result.statusCode;
                done();
            });
        });

        it('returns a 200', function () {
            chai.assert.equal(status, 200);
        });

        it('returns a repo', function () {
            chai.assert.ok(item.id);
        });

    });

    describe('editUserPermission', function () {

        var status;

        before(function (done) {
            util.put('/repos/1/users/testuser/permissions/read').then(function (result) {
                status = result.statusCode;
                done();
            });
        });

        it('returns a 204', function () {
            chai.assert.equal(status, 204);
        });

    });

    describe('removeUserPermission', function () {

        var status;

        before(function (done) {
            util.del('/repos/1/users/testuser').then(function (result) {
                status = result.statusCode;
                done();
            });
        });

        it('returns a 204', function () {
            chai.assert.equal(status, 204);
        });

    });

});
