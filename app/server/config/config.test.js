'use strict';

let chai = require('chai');

describe('config.test.js', () => {

    //clear out the conf module so we can manipulate the environment to bootstrap
    beforeEach(() => {
        let mod = require.resolve('./index');
        delete require.cache[mod];
    });

    it('loads schema defaults without environment file', () => {
        let conf = require('./index');
        chai.assert.equal(conf.get('server.port'), 3000);
        chai.assert.equal(conf.get('service'), 'live');
    });

    it('loads and overlays config values from [mock.json] environment file', () => {
        process.env.ENV = 'mock';
        let conf = require('./index');
        chai.assert.equal(conf.get('service'), 'mock');
    });

});
