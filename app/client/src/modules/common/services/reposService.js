'use strict';

module.exports = /*@ngInject*/
    function reposService($resource) {
        return $resource('api/v1/repos', {}, {
            'query': { method: 'GET', isArray: true }
        });
    };
