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
        let parts = opts.appMethod.split('.'),
            methods = require('../apps/' + parts[0] + '/methods'),
            method = methods[parts[1]];

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
