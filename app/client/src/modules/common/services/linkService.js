'use strict';

let templates = require('url-template');

module.exports = /*@ngInject*/
    function linkService($http) {
        return {
            exec (link, params) {
                let method = (link.method || 'get').toLowerCase(),
                    href = link.href,
                    template = templates.parse(href),
                    url = 'api/v1/' + template.expand(params);

                $http[method](url);
            }
        };
    };
