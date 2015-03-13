'use strict';

let templates = require('url-template');

/**
 * Simple service that executes hypermedia links.
 * @param $http
 * @returns {{exec: Function}}
 */
module.exports = /*@ngInject*/
    ($http) => {
        return {
            /**
             * Executes a link using http.
             * The link is required to contain an href that will be invoked.
             * If the href is templated (RFC6570), params should be passed which will be used to expand the template.
             * The link may optionally contain the method name (defaults to 'get', in accordance with link spec).
             * TODO: support PUT/POST of payloads
             * @param link
             * @param params
             */
            exec (link, params) {
                let method = (link.method || 'get').toLowerCase(),
                    href = link.href,
                    template = templates.parse(href),
                    url = 'api/v1/' + template.expand(params);

                $http[method](url);
            }
        };
    };
