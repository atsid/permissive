'use strict';
/**
 * This module provides general utilities to make integ testing easier.
 * @type {*}
 */
var request = require('request'),
    Promise = require('bluebird'),
    root = 'http://localhost:3000'; //TODO: read from config

Promise.promisifyAll(request);

/**
 * Wraps up a request, using localhost and the configured app port, and parsing JSON automatically.
 * @param path - relative path of request (not including host:port).
 * @returns {Promise}
 */
exports.get = function (path) {

    var promise = new Promise(function (resolve, reject) {

        request.getAsync(root + path).then(function (args) {
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
