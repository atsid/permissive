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
    }),

    /**
     * Promisified Github APIs
     */
    getMembers = Promise.promisify(github.orgs.getMembers);

github.authenticate({
    type: 'basic',
    username: username,
    password: password
});

module.exports = {
    get: function () {
        return getMembers({
            user: username,
            org: org,
            per_page: 100
        });
    }
};
