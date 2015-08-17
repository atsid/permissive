'use strict';

let conf = require('../config');
conf.set('service', 'mock');

let expect = require('chai').expect,
    permissions = require('./permissions');

//jscs:disable disallowDanglingUnderscores
describe('permissions.js', () => {
    describe('getOrganization', () => {
        it('github organization will be returned', (done) => {
            let req = {};
            permissions.getOrganization(req, {}, () => {
                let entity = req.entity;
                expect(entity.repos[0].name).to.equal('Test-Repo-1');
                done();
            });
        });
    });
});
