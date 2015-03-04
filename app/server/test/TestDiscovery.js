'use strict';

var chai = require('chai'),
    express = require('express'),
    path = require('path'),
    discovery = require('../discovery');

describe('discovery.js', function () {

    it('discovery finds one app in test apps folder', function (done) {

        discovery.find(path.join(__dirname, '../test/data/test-apps')).then(function (apps) {
            chai.assert.equal(apps.length, 1);
            done();
        });

    });

    it('discovery instantiates an express app ready to mount', function (done) {

        //we're not going to really assert anything about the app itself, because that is tested by wire.
        discovery.find(path.join(__dirname, '../test/data/test-apps')).then(function (apps) {

            var app = express(),
                subapp = apps[0];

            subapp.on('mount', function (parent) {
                chai.assert.equal(subapp.mountpath, '/test-root');
                done();
            });
            app.use('/test-root', subapp);

        });

    });

    it('discovery fails if invalid apps folder is provided', function (done) {

        discovery.find('fake-folder-xyz').then(function () {
            chai.assert.fail();
            done();
        }).catch(function (err) {
            chai.assert.equal(err.code, 'ENOENT');
            done();
        });

    });

});
