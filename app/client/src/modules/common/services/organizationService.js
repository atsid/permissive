'use strict';

module.exports = /*@ngInject*/
    ($resource) => {
        return $resource('api/v1/organization', {}, {
            'query': { method: 'GET' }
        });
    };
