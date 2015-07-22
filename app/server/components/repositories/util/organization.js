'use strict';

var repoUtil = require('./repos'),
    userUtil = require('./users'),
    Bluebird = require('bluebird');

/**
 * Returns all organization repos with an associated user list and corresponding user permissions.
 */
module.exports = {
    getOrganization () {
        let orgMap = {};

        return new Promise((resolve, reject) => {
            Bluebird.join(userUtil.getGithubProfiles(), repoUtil.getGithubReposWithCollaborators(), (users, repos) => {
                orgMap.users = users.reduce((users, user) => {
                    users[user.username] = user;
                    return users;
                }, {});
                orgMap.repos = repos;
                resolve(orgMap);
            });
        });
    }
};
