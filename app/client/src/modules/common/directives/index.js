'use strict';

/**
 * Require all the individual directives
 */

module.exports =
    angular.module('permissive.common.directives', [])
    .directive('user', require('./user/user.js'))
    .directive('repo', require('./repo/repo.js'))
    .directive('navbar', require('./navbar/navbar.js'));
