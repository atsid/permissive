'use strict';

module.exports = /*@ngInject*/
    ($resource) => {
        return $resource('api/v1/repos', {}, {
            'query': { method: 'GET', isArray: true }
        });
    };
