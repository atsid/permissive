'use strict';

var chai = require('chai'),
    util = require('./util');

describe('User model HTTP requests', function () {

    this.timeout(10000);

    describe('GET /users', function () {

        var users,
            status;

        before(function (done) {
            util.get('/users').then(function (result) {
                users = JSON.parse(result.body);
                status = result.statusCode;
                done();
            });
        });

        it('returns a 200', function () {
            chai.assert.equal(status, 200);
        });

        it('returns at least one user', function () {
            chai.assert.ok(users.length > 0);
            chai.assert.ok(users[0].username);
        });

        it('user has no links', function () {
            chai.assert.isUndefined(users[0].links);
        });

    });

    describe('GET /users?permission_repo=:id', function () {

        var users,
            status;

        before(function (done) {
            util.get('/users?permission_repo=1').then(function (result) {
                users = JSON.parse(result.body);
                status = result.statusCode;
                done();
            });
        });

        it('returns a 200', function () {
            chai.assert.equal(status, 200);
        });

        it('returns at least one user', function () {
            chai.assert.ok(users.length > 0);
            chai.assert.ok(users[0].username);
        });

        it('user has links', function () {
            chai.assert.ok(users[0].links.length > 0);
        });

    });

    describe('PUT /users/:username/repos/:id/permissions/:permission', function () {

        var status;

        before(function (done) {
            util.put('/users/testuser/repos/1/permissions/read').then(function (result) {
                status = result.statusCode;
                done();
            });
        });

        it('returns a 204', function () {
            chai.assert.equal(status, 204);
        });

    });

    describe('DELETE /users/:username/repos/:id', function () {

        var status;

        before(function (done) {
            util.del('/users/testuser/repos/1').then(function (result) {
                status = result.statusCode;
                done();
            });
        });

        it('returns a 204', function () {
            chai.assert.equal(status, 204);
        });

    });

});
