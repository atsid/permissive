'use strict';

var chai = require('chai'),
    express = require('express'),
    path = require('path'),
    discovery = require('../discovery');

describe('discovery.js', () => {

    it('discovery finds one app in test apps folder', (done) => {

        discovery.find(path.join(__dirname, '../test/data/test-apps')).then((apps) => {
            chai.assert.equal(apps.length, 1);
            done();
        });

    });

    it('discovery instantiates an express app ready to mount', (done) => {

        //we're not going to really assert anything about the app itself, because that is tested by wire.
        discovery.find(path.join(__dirname, '../test/data/test-apps')).then((apps) => {

            let app = express(),
                subapp = apps[0];

            subapp.on('mount', (parent) => {
                chai.assert.equal(subapp.mountpath, '/test-root');
                done();
            });
            app.use('/test-root', subapp);

        });

    });

    it('discovery fails if invalid apps folder is provided', (done) => {

        discovery.find('fake-folder-xyz').then(() => {
            chai.assert.fail();
            done();
        }).catch((err) => {
            chai.assert.equal(err.code, 'ENOENT');
            done();
        });

    });

});
