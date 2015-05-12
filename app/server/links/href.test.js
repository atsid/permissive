'use strict';

let href = require('./href'),
    expect = require('chai').expect;

describe('href.test.js', () => {

    describe('toRfc6570', () => {

        it('express template is converted without params', () => {

            let template = '/repos/:id/users/:username',
                expected = '/repos/{id}/users/{username}',
                actual = href.toRfc6570(template);

            expect(actual).to.equal(expected);

        });

        it('express template is converted and params expanded', () => {

            let template = '/repos/:id/users/:username',
                expected = '/repos/67/users/octocat',
                params = {
                    id: 67,
                    username: 'octocat'
                },
                actual = href.toRfc6570(template, params);

            expect(actual).to.equal(expected);

        });

        it('express template is converted, missing params are not expanded', () => {

            let template = '/repos/:id/users/:username',
                expected = '/repos/72/users/{username}',
                params = {
                    id: 72
                },
                actual = href.toRfc6570(template, params);

            expect(actual).to.equal(expected);

        });

    });

});
