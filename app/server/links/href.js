'use strict';

module.exports = {

    /**
     * Converts an express-style template to RFC6570 syntax for use with links.
     * Optionally expands with params as well.
     * @param template
     * @param params
     */
    toRfc6570(path, params) {

        let pattern = /:([\w]+)/g,
            uri = path,
            match;

        //start by replacing :param express format with {param} RFC format
        while ((match = pattern.exec(path)) !== null) {
            uri = uri.replace(match[0], '{' + match[1] + '}');
        }

        //now create simple replacement strings for any params that exist
        //note that there is a very good RFC-compliant url-template library (which we're using on the client),
        //but it DOES NOT allow empty params to remain in template form, which is what we want for links.
        if (params) {
            Object.keys(params).forEach((key) => {
                let pattern = new RegExp('\{' + key + '\}', 'g'),
                    value = params[key];
                uri = uri.replace(pattern, value);
            });
        }

        return uri;
    }

};
