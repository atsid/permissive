'use strict';

let conf = require('../config');
conf.set('service', 'mock');

let expect = require('chai').expect,
    authenticate = require('./authenticate');

describe('authenticate.js', () => {

    describe('isAuthenticated', () => {

        it('not authenticated returns 401', (done) => {

            let req = {
                    isAuthenticated: () => {
                        return false;
                    }
                },
                res = {
                    sendStatus: (status) => {
                        expect(status).to.equal(401);
                        done();
                    }
                };

            authenticate.isAuthenticated(req, res);

        });

        it('authenticated but not org member returns 401', (done) => {

            let req = {
                    isAuthenticated: () => {
                        return true;
                    },
                    session: {
                        passport: {
                            user: {
                                username: 'non-existent-user'
                            }
                        }
                    }
                },
                res = {
                    sendStatus: (status) => {
                        expect(status).to.equal(401);
                        done();
                    }
                };

            authenticate.isAuthenticated(req, res);

        });

        it('authenticated org member continues request with [next]', (done) => {

            let req = {
                isAuthenticated: () => {
                    return true;
                },
                session: {
                    passport: {
                        user: {
                            username: 'testuser1'
                        }
                    }
                }
            };

            authenticate.isAuthenticated(req, {}, () => {
                done();
            });

        });

    });


});
