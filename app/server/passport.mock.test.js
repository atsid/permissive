'use strict';

let passport = require('./passport.mock'),
    expect = require('chai').expect,
    conf = require('./config');

//jscs:disable disallowDanglingUnderscores
describe('passport.mock.js', () => {

    it('initialize sets up user correctly and invokes next', (done) => {

        let middleware = passport.initialize(),
            req = {
                session: {}
            };

        middleware(req, {}, () => {

            let username = conf.get('github.username');
            expect(req._passport.session.user.username).to.equal(username);
            expect(req.session.passport.user.username).to.equal(username);

            done();
        });

    });

});
