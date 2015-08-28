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
});
