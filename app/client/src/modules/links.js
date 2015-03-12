'use strict';

/**
 * Utilities for working with hypermedia links in the hyper schema format:
 * http://json-schema.org/latest/json-schema-hypermedia.html
 * @type {{}}
 */
module.exports = {

    /**
     * Finds a link that matches a specified rel.
     * @param rel
     * @param links
     */
    findByRel (rel, links) {
        //TODO: es6 polyfill for 'find'
        let link;
        if (links) {
            links.some((l) => {
                if (l.rel === rel) {
                    link = l;
                    return true;
                }
            });
        }
        return link;
    }
};
