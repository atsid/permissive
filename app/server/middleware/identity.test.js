'use strict';

let conf = require('../config');
conf.set('service', 'mock');

let expect = require('chai').expect,
    identity = require('./identity');

//jscs:disable disallowDanglingUnderscores
describe('identity.js', () => {
    describe('getUser', () => {
        it('github user will be returned', (done) => {
            let req = {
                    session: {
                        passport: {
                            user: {
                                username: 'testuser1'
                            }
                        }
                    }
                };
            identity.getIdentity(req, {}, () => {
                let entity = req.entity;
                expect(entity.username).to.equal('testuser1');
                done();
            });
        });
    });
});
