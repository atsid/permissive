'use strict';

var GitHubApi = require('github'),
    Bluebird = require('bluebird'),
    username = process.env.GITHUB_USER,
    password = process.env.GITHUB_PASSWORD,
    org = process.env.GITHUB_ORG,
    token = process.env.GITHUB_TOKEN,
    github = new GitHubApi({
        version: '3.0.0',
        protocol: 'https',
        host: 'api.github.com',
        timeout: 10000,
        headers: {
            'user-agent': 'permissive'
        }
    });

if (token) {
    github.authenticate({
        type: "oauth",
        token: token
    });
    console.log("Github Authentication Method: Token");
} else {
    github.authenticate({
        type: 'basic',
        username: username,
        password: password
    });
    console.log("Github Authentication Method: Username and Password");
}

/**
 * Emit an object with Promisified Github methods and a raw, configured github API object.
 * @type {{github: *, getMembers}}
 */
module.exports = {
    github: github,
    config: {
        org: org
    },
    getUsers: Bluebird.promisify(github.orgs.getMembers),
    getUser: Bluebird.promisify(github.user.getFrom),
    getRepos: Bluebird.promisify(github.repos.getFromOrg)
};
