'use strict';

/**
 * Require all the individual filters
 */

module.exports =
    angular.module('permissive.common.filters', [])
    .filter('fooFilter', require('./fooFilter'));
