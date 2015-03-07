'use strict';

module.exports = /*@ngInject*/
    function usersService($resource) {
        return $resource('users/:userId', {}, {
            'query': { method: 'GET', isArray: true }
        });
    };
