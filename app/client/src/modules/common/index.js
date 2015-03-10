'use strict';

/**
 * Starts the require chain for all directives/filters/services
 */

module.exports =
    angular.module('permissive.common', [
        require('./directives').name,
        require('./filters').name,
        require('./services').name
    ]);
