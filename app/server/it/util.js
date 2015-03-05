'use strict';
/**
 * This module provides general utilities to make integ testing easier.
 * @type {*}
 */
var request = require('request'),
    Promise = require('bluebird'),
    root = 'http://localhost:3000', //TODO: read from config
    methods = ['get', 'put', 'post', 'del'];

Promise.promisifyAll(request);

/**
 * Wraps up a request, using localhost and the configured app port, and parsing JSON automatically.
 * @param path - relative path of request (not including host:port).
 * @returns {Promise}
 */
module.exports = {};
methods.forEach(function (method) {

    module.exports[method] = function (path, options) {

        var promise = new Promise(function (resolve, reject) {

            request[method + 'Async'](root + path, options).then(function (args) {
                try {
                    var resp = args[0],
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
