'use strict';

/**
 * Require all the individual services
 */

module.exports =
    angular.module('permissive.common.services', [])
    .factory('identityService', require('./identityService'))
    .factory('usersService', require('./usersService'))
    .factory('reposService', require('./reposService'))
    .factory('linkService', require('./linkService'));
