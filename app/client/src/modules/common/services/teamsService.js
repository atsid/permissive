'use strict';

module.exports = /*@ngInject*/
    ($resource) => {
        return $resource('api/v1/teams', {}, {
            'query': { method: 'GET', isArray: true }
        });
    };
