'use strict';

module.exports = /*@ngInject*/
    function reposService($resource) {
        return $resource('api/v1/repos', {}, {
            'query': {
                method: 'GET',
                isArray: true
            },
            //TODO: dealing with hypermedia would probably be best done directly with $http
            'editUserPermission': { method: 'PUT', url: 'api/v1/:link'}
        });
    };
