'use strict';

/**
 * Require all the individual services
 */

module.exports =
    angular.module('permissive.common.services', [])
    .factory('usersService', require('./usersService'));
