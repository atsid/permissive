'use strict';
/**
 * Bootstraps application config using convict.
 * This includes definition of all of the config values and their defaults.
 * Environment variables will always override defaults.
 *
 * The specific config environment can be set using the 'ENV' variable. This should be a named
 * environment that maps to a config file in the 'config' folder, like <env>.json.
 *
 * NOTE: This supports a special 'local.json' file in the config folder which is ignored by git.
 *
 * This is used for developer convenience to store personal config variables without them making their way into git.
 */
var fs = require('fs'),
    convict = require('convict'),
    debug = require('debug')('app:config'),
    schema = require('./schema'),
    //load schema and defaults
    conf = convict(schema),
    // load environment dependent configuration
    env = conf.get('env'),
    filename = __dirname + '/' + env + '.json';

if (fs.existsSync(filename)) {
    debug('Loading config file: ' + filename);
    conf.loadFile(filename);
}

// perform validation of defined params according to config schema
conf.validate();

module.exports = conf;
