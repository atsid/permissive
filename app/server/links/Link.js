'use strict';

var debug = require('debug')('app:links:link'),
    href = require('./href'),
    conf = require('../config');

/**
 * Class for building hypermedia links.
 */
class Link {
    constructor(opts) {

        //TODO: this really needs to be retrievable from an injectable source like a factory
        let methods = require('../apps/' + opts.app + '/names'),
            method = methods[opts.method];

        this.rel = opts.rel;
        this.method = method.method.toUpperCase(); //TODO: support default [get]
        this.href = href.toRfc6570(
                conf.get('api.root') +
                conf.get('api.version') +
                method.path,
            opts.params);
    }
}

module.exports = Link;
