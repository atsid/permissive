'use strict';

var GitHubApi = require('github'),
    Promise = require('bluebird'),
    username = process.env.GITHUB_USER,
    password = process.env.GITHUB_PASSWORD,
    org = 'atsid',
    github = new GitHubApi({
        version: '3.0.0',
        protocol: 'https',
        host: 'api.github.com',
        timeout: 5000,
        headers: {
            'user-agent': username
        }
    });

github.authenticate({
    type: 'basic',
    username: username,
    password: password
});

/**
 * Emit an object with Promisified Github methods and a raw, configured github API object.
 * @type {{github: *, getMembers}}
 */
module.exports = {
    github: github,
    config: {
        username: username,
        org: org
    },
    getMembers: Promise.promisify(github.orgs.getMembers)
};
