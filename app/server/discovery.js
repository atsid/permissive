'use strict';

/**
 * Provides functionality to load and start sub-apps.
 *
 */
var fs = require('fs'),
    path = require('path'),
    Bluebird = require('bluebird'),
    wire = require('./wire');

Promise.promisifyAll(fs);

module.exports = {

    /**
     * Finds subapp folders and boots them as express apps.
     * Returns them in an array to be used by the master app.
     *
     * This is accomplished by finding and loading the default module (index.js) from each subfolder, which should contain
     * route config. The wire util is used to create Express apps from these configs.
     *
     * @param root - root folder to read subapp folders from.
     * @returns {Promise} - arg is a list of express apps ready for mounting.
     */
    find: (root) => {
        return new Promise((resolve, reject) => {
            console.log('finding apps in path: ' + root);
            fs.readdirAsync(root)
            .then((files) => {
                console.log('apps found:' + files);

                let routes = files.map((file) => {
                    return require(path.join(root, file));
                }),
                apps = routes.map((route) => {
                    return wire(route);
                });

                resolve(apps);
            }, reject);
        });
    }
};
