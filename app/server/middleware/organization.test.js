'use strict';

let conf = require('../config');
conf.set('service', 'mock');

let expect = require('chai').expect,
    chai = require('chai'),
    github = require('../components/services/github.mock'),
    organization = require('./organization');

//jscs:disable disallowDanglingUnderscores
describe('organization.js', () => {
    describe('getOrganization', () => {
        it('github organization will be returned', (done) => {
            let req = {};
            organization.getOrganization(req, {}, () => {
                let entity = req.entity;
                expect(entity[1].repo.name).to.equal('Test-Repo-1');
                done();
            });
        });
    });
});
