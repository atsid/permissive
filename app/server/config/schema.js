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

    api: {
        root: {
            doc: 'Root path under host/port for  RESTful API.',
            default: '/api/'
        },
        version: {
            doc: 'Version to use for RESTful API routes.',
            default: 'v1'
        }
    },

    //basic server properties.
    server: {
        protocol: {
            doc: 'Standard protocol to use for prefixing routes.',
            default: 'http'
        },
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
        username: {
            doc: 'Hard-coded username for use with mock service, for testing permissions.',
            default: 'testuser3',
            env: 'GITHUB_USERNAME'
        }
    },

    //settings for oauth app (we're using passport)
    oauth: {
        provider: {
            doc: 'OAuth provider to use. We only support GitHub right now.',
            default: 'github'
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
        authRoute: {
            doc: 'Local application route for OAuth provider to check auth.',
            default: '/auth/github'
        },
        authCallbackRoute: {
            doc: 'Local application route for successful auth to signal at.',
            default: '/auth/github/callback'
        },
        authenticatedRoute: {
            doc: 'Local application route to check if user has been authenticated.',
            default: '/auth/authenticated'
        },
        failureCallback: {
            doc: 'Local application route for failed auth to signal at.',
            default: '/auth/failure'
        },
        failureRedirect: {
            doc: 'Local application route to redirect failed login.',
            default: '/'
        }
    },

    //session properties (only use these for the auth connection).
    //see here for docs: https://github.com/expressjs/session
    session: {
        secret: {
            doc: 'Secret key for the app session.',
            default: 'keyboard cat',
            env: 'SESSION_SECRET'
        },
        resave: {
            default: false
        },
        saveUninitialized: {
            default: true
        },
        cookie: {
            secure: {
                default: false
            }
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
