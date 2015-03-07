'use strict';

/**
 * Require all the individual directives
 */

module.exports =
    angular.module('permissive.common.directives', [])
    .directive('user', require('./user/user.js'))
    .directive('navbar', require('./navbar/navbar.js'));
