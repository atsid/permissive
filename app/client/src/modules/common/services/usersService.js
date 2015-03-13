'use strict';

module.exports = /*@ngInject*/
    ($resource) => {
        return $resource('api/v1/users', {}, {
            'query': { method: 'GET', isArray: true }
        });
    };
