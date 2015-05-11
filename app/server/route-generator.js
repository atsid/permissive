'use strict';
/**
 * Generates express-jefferson route configs from a names.js and middlewares.js
 * config file, suitable for placements in the 'routes' config block.
 *
 * This function will marry an independent name hash with a middleware hash to create a jefferson-compatible 'routes' config block.
 * The return value is therefore a map of the form:
 * {
 *   <path>: {
 *      <method>: [<middlewares>]
 *   }
 * }
 *
 * The intention of this is to allow separation of method naming and HTTP config from middleware definitions for use elsewhere (such as link generation).
 *
 * The names should be a map of the form:
 * {
 *   <name>: {
 *       <method>: http method,
 *       <path>: express-compatible path template
 *   }
 * }
 *
 * while middlewares should be a map of the form:
 * {
 *   <name>: [<middleware functions>]
 * }
 *
 *
 * @param names - map of business method name to HTTP config (method, path template).
 * @param middlewares - map of business method name to middleware arrays.
 */
module.exports =  (names, middlewares) => {

    let routes = {};

    Object.keys(names).forEach((name) => {

        let naming = names[name],
            middles = middlewares[name],
            conf = {};

        conf[naming.method] = middles;
        routes[naming.path] = conf;
    });

    return routes;

};
