'use strict';

/**
 * Provides functionality to load and start sub-apps.
 *
 */
var fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird');

Promise.promisifyAll(fs);

module.exports = {

    /**
     * Finds subapp folders and boots them as express apps.
     * Returns them in an array to be used by the master app.
     * @param root - root folder to read subapp folders from.
     * @returns {Promise} - arg is a list of express apps ready for mounting.
     */
    find: function (root) {

        var promise = new Promise(function (resolve, reject) {

            console.log('finding apps in path: ' + root);

            fs.readdirAsync(root).then(function (files) {

                console.log('apps found:' + files);

                var apps = files.map(function (file) {
                    return require(path.join(root, file));
                });

                resolve(apps);

            }, reject);
        });

        return promise;
    }

};
