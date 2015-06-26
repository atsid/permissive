'use strict';

module.exports = /*@ngInject*/
    ($resource) => {
        return $resource('api/v1/identity', {}, {
            'query': { method: 'GET' }
        });
    };
