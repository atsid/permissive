'use strict';

let conf = require('../config');
conf.set('service', 'mock');

let expect = require('chai').expect,
    github = require('../components/services/github.mock'),
    permissions = require('./permissions');

//jscs:disable disallowDanglingUnderscores
describe('permissions.js', () => {

    describe('createTeamForRepoPermission', () => {

        //reset the teams by deleting any new ones
        afterEach(() => {
            Object.keys(github.teams).forEach((key) => {
                if (key > 5) {
                    delete github.teams[key];
                }
            });
        });

        it('existing team continues request with [next]', (done) => {

            let req = {
                params: {
                    id: 1,
                    permission: 'push'
                }
            };

            permissions.createTeamForRepoPermission(req, {}, () => {
                done();
            });

        });

        it('team is created for repo/permission combo and continues request with [next]', (done) => {

            let req = {
                params: {
                    id: 2,
                    permission: 'push'
                }
            };

            permissions.createTeamForRepoPermission(req, {}, () => {
                done();
            });

        });

    });

    describe('editRepoPermissionForUser', () => {

        afterEach(() => {
            //trim the new user back off
            github.teams['5']._users.pop();
        });

        it('user is added to users list for existing repo/permission team', (done) => {

            //team 5
            let req = {
                params: {
                    id: 2,
                    username: 'testuser1',
                    permission: 'admin'
                }
            };

            permissions.editRepoPermissionForUser(req, {}, () => {
                expect(github.teams['5']._users.length).to.equal(2);
                done();
            });

        });


    });





});
