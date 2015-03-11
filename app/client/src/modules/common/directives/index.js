'use strict';

/**
 * Require all the individual directives
 */

module.exports =
    angular.module('permissive.common.directives', [])
    .directive('user', require('./user/user.js'))
    .directive('userdetails', require('./userdetails/userdetails.js'))
    .directive('repo', require('./repo/repo.js'))
    .directive('repodetails', require('./repodetails/repodetails.js'))
    .directive('navbar', require('./navbar/navbar.js'));
