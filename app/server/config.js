'use strict';
/**
 * Bootstraps application config using convict.
 * This includes definition of all of the config values and their defaults.
 * Environment variables will always override defaults.
 *
 * Also, this bootstrapping supports a 'local-config.js' file in the permissive root.
 * This file is used for local developer config convenience, and is ignored by git.
 */
var convict = require('convict'),
    cpus = require('os').cpus().length,
    conf = convict({
        server: {
            port: {
                doc: 'The port to bind.',
                format: 'port',
                default: 3000,
                env: 'PORT'
            },
            hostname: {
                doc: 'The host to run on.',
                default: 'localhost',
                env: 'HOSTNAME'
            },
            enableClustering: {
                doc: 'Whether to enable automatic node clustering based on cores available.',
                default: false,
                env: 'ENABLE_CLUSTERING'
            },
            workerLimit: {
                doc: 'Hard limit on number of worker threads.',
                default: cpus,
                env: 'WORKER_LIMIT'
            }
        },
        github: {
            org: {
                doc: 'GitHub org name to use for repository management',
                default: '',
                env: 'GITHUB_ORG'
            },
            token: {
                doc: 'OAuth token with Owner permissions for editing teams through Permissive.',
                default: '',
                env: 'GITHUB_TOKEN'
            },
            clientID: {
                doc: 'OAuth client ID for application.',
                default: 'none',
                env: 'GITHUB_CLIENTID'
            },
            clientKey: {
                doc: 'OAuth client secret key for application.',
                default: 'none',
                env: 'GITHUB_CLIENT_KEY'
            },
            username: {
                doc: 'Hard-coded username for use with mock service, for testing permissions.',
                default: 'testuser3',
                env: 'GITHUB_USERNAME'
            }
        },
        session: {
            secret: {
                doc: 'Secret key for the app session.',
                default: 'keyboard cat',
                env: 'SESSION_SECRET'
            }
        },
        service: {
            doc: 'Specify the backend service type to use - either live GitHub or mock.',
            format: ['live', 'mock'],
            default: 'live',
            env: 'SERVICE'
        }
    });

// load environment dependent configuration
//var env = conf.get('env');
//conf.loadFile('./config/' + env + '.json');

// perform validation of defined params according to config schema
conf.validate();

module.exports = conf;
