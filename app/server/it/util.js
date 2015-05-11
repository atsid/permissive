'use strict';
/**
 * This module provides general utilities to make integ testing easier.
 * @type {*}
 */
var request = require('request'),
    Bluebird = require('bluebird'),
    conf = require('../config'),
    root = conf.get('server.protocol') + '://' + conf.get('server.hostname') + ':' + conf.get('server.port') + conf.get('api.root') + conf.get('api.version'),
    methods = ['get', 'put', 'post', 'del'];

Bluebird.promisifyAll(request);

/**
 * Wraps up a request, using configured API URL root.
 * Uses a promisified request and returns a promise, to simplify usage.
 * @param path - relative path of request (not including host:port).
 * @returns {Promise}
 */
module.exports = {};
methods.forEach((method) => {

    module.exports[method] = (path, options) => {

        let promise = new Promise((resolve, reject) => {

            request[method + 'Async'](root + path, options).then((args) => {
                try {
                    let resp = args[0],
                        result = {
                            statusCode: resp.statusCode,
                            body: resp.body
                        };
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            });
        });
        return promise;
    };
});
