'use strict';

module.exports = /*@ngInject*/
    function usersService($resource) {
        return $resource('api/v1/users', {}, {
            'query': { method: 'GET', isArray: true }
        });
    };
