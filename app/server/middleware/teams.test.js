'use strict';

let conf = require('../config');
conf.set('service', 'mock');

let expect = require('chai').expect,
    teams = require('./teams');

//jscs:disable disallowDanglingUnderscores
describe('teams.js', () => {
    describe('listTeams', () => {
        it('teams are listed', (done) => {
            let req = {};
            teams.listTeams(req, {}, () => {
                let entity = req.entity;
                expect(entity.length).to.equal(5);
                done();
            });
        });
    });
    describe('listTeamsLinks', () => {
        it('if logged-in user does not have "owner" permissions, "convert-team" link is not present', (done) => {
            let req = {
                session: {
                    passport: {
                        user: {
                            username: 'testuser1'
                        }
                    }
                },
                entity: [{
                    id: 1
                }]
            };
            teams.listTeamsLinks(req, {}, () => {
                let entity = req.entity;
                expect(entity.length).to.equal(1);
                expect(entity[0].links).to.be.undefined;
                done();
            });
        });
        it('if logged-in user has "owner" permissions, "convert-team" link is present', (done) => {
            let req = {
                session: {
                    passport: {
                        user: {
                            username: 'testuser3'
                        }
                    }
                },
                entity: [{
                    id: 1
                }]
            };
            teams.listTeamsLinks(req, {}, () => {
                let entity = req.entity;
                expect(entity.length).to.equal(1);
                expect(entity[0].links.length).to.equal(1);
                expect(entity[0].links[0].rel).to.equal('convert-team');
                done();
            });
        });
    });
});
