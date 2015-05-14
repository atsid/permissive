'use strict';

let conf = require('../config');
conf.set('service', 'mock');

let expect = require('chai').expect,
    github = require('../components/services/github.mock'),
    users = require('./users');

//jscs:disable disallowDanglingUnderscores
describe('users.js', () => {

    describe('listUsers', () => {

        it('all users will be listed', (done) => {

            let req = {};

            users.listUsers(req, {}, () => {
                let entity = req.entity;
                expect(entity.length).to.equal(3);
                done();
            });

        });

    });

    describe('listUsersPermission', () => {

        it('missing "permission_repo" query param results in passthrough', (done) => {

            let req = {
                query: {},
                entity: [{
                    username: 'testuser1'
                }]
            };

            users.listUsersPermission(req, {}, () => {
                let entity = req.entity;
                expect(entity.length).to.equal(1);
                expect(entity[0].permission).to.be.undefined;
                done();
            });

        });

        it('"permission_repo" query param adds "permission" flag to users', (done) => {

            let req = {
                query: {
                    permission_repo: 1
                },
                entity: [{
                    username: 'testuser1'
                }]
            };

            //testuser1 is in the Contributors group with 'push' for repo 1,
            //but mock permissive team only exists for push
            users.listUsersPermission(req, {}, () => {
                let entity = req.entity;
                expect(entity.length).to.equal(1);
                expect(entity[0].permission.github).to.equal('push');
                expect(entity[0].permission.permissive).to.equal('pull');
                done();
            });

        });

    });

    describe('listUsersLinks', () => {

        it('missing "permission_repo" query param results in passthrough', (done) => {

            let req = {
                query: {},
                session: {
                    passport: {
                        user: {
                            username: 'testuser1'
                        }
                    }
                },
                entity: [{
                    username: 'testuser1'
                }]
            };

            users.listUsersLinks(req, {}, () => {
                let entity = req.entity;
                expect(entity.length).to.equal(1);
                expect(entity[0].links).to.be.undefined;
                done();
            });

        });

        it('if logged-in user does not have "admin" permission on repo, "edit-repo-permission" link is not present', (done) => {

            let req = {
                query: {
                    permission_repo: 1
                },
                session: {
                    passport: {
                        user: {
                            username: 'testuser1'
                        }
                    }
                },
                entity: [{
                    username: 'testuser1'
                }]
            };

            users.listUsersLinks(req, {}, () => {
                let entity = req.entity;
                expect(entity.length).to.equal(1);
                expect(entity[0].links).to.be.undefined;
                done();
            });

        });

        it('if logged-in user has "admin" permission on repo, "edit-repo-permission" link is present', (done) => {

            let req = {
                query: {
                    permission_repo: 1
                },
                session: {
                    passport: {
                        user: {
                            username: 'testuser3'
                        }
                    }
                },
                entity: [{
                    username: 'testuser1'
                }]
            };

            users.listUsersLinks(req, {}, () => {
                let entity = req.entity;
                expect(entity.length).to.equal(1);
                expect(entity[0].links.length).to.equal(1);
                expect(entity[0].links[0].rel).to.equal('edit-repo-permission');
                done();
            });

        });

    });

});
