'use strict';
/**
 * Generates express-jefferson route configs from a methods.js and middlewares.js
 * config file pair, suitable for placement in the 'routes' config block.
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
 * @param methods - map of business method name to HTTP config (method, path template).
 * @param middlewares - map of business method name to middleware arrays.
 */
module.exports =  (methods, middlewares) => {

    let routes = {};

    Object.keys(methods).forEach((key) => {

        let method = methods[key],
            middles = middlewares[key],
            conf = {};

        conf[method.method] = middles;
        routes[method.path] = conf;
    });

    return routes;

};
