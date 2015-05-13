'use strict';

let conf = require('../config');
conf.set('service', 'mock');

let expect = require('chai').expect,
    send = require('./send');

describe('send.js', () => {

    describe('json', () => {

        it('request entity is sent to response.json method', (done) => {

            let req = {
                entity: {
                    id: 1
                }
            },
            res = {
                json: (ent) => {
                    done();
                }
            };

            send.json(req, res);

        });

    });

    describe('noContent', () => {

        it('response status is set to 204 and ended', (done) => {

            let res = {
                status: (stat) => {
                    expect(stat).to.equal(204);
                    return {
                        end: () => {
                            done();
                        }
                    };
                }
            };

            send.noContent({}, res);

        });

    });

});
