'use strict';

var GitHubApi = require('github'),
    Bluebird = require('bluebird'),
    debug = require('debug')('app:services:github'),
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
    debug("Github authentication method: Token");
} else {
    debug("No Github Token found. App will be unable to authenticate.");
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
    getRepos: Bluebird.promisify(github.repos.getFromOrg),
    getTeams: Bluebird.promisify(github.orgs.getTeams),
    getTeamMembers: Bluebird.promisify(github.orgs.getTeamMembers),
    getTeamRepos: Bluebird.promisify(github.orgs.getTeamRepos),
    addTeamMember: Bluebird.promisify(github.orgs.addTeamMember),
    deleteTeamMember: Bluebird.promisify(github.orgs.deleteTeamMember)
};
