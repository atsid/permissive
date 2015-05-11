'use strict';
/**
 * This file contains the schema and default values for Permissive config options.
 * @type {*}
 */
var cpus = require('os').cpus().length;
module.exports = {

    //specifies the runtime environment. a file in this folder named <env>.json needs to exist.
    env: {
        doc: 'Environment the app is running in, for selection of pre-defined config files.',
        default: '',
        env: 'ENV'
    },

    //basic server properties.
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

    //properties required for interacting with the GitHub API and OAuth service.
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

    //session properties for the auth connection.
    session: {
        secret: {
            doc: 'Secret key for the app session.',
            default: 'keyboard cat',
            env: 'SESSION_SECRET'
        }
    },

    //toggle for live (hitting real GitHub API) or mock (using fake data in github.mock.js file)
    service: {
        doc: 'Specify the backend service type to use - either live GitHub or mock.',
        format: ['live', 'mock'],
        default: 'live',
        env: 'SERVICE'
    }

};
