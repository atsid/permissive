'use strict';

/**
 * Require all the individual services
 */

module.exports =
    angular.module('permissive.common.services', [])
    .factory('identityService', require('./identityService'))
    .factory('usersService', require('./usersService'))
    .factory('reposService', require('./reposService'))
    .factory('teamsService', require('./teamsService'))
    .factory('organizationService', require('./organizationService'))
    .factory('linkService', require('./linkService'));
