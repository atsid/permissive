'use strict';

var permUtil = require('./permissions'),
    repoUtil = require('./repos'),
    userUtil = require('./users'),
    Bluebird = require('bluebird'),
    clone = require('clone');

/**
 * Returns all organization repos with an associated user list and corresponding user permissions.
 */
module.exports = {
    getOrganization () {
        let orgMap = {},
            defaults = permUtil.getDefaultPermissions();

        return new Promise((resolve, reject) => {
            Bluebird.join(permUtil.getPermissionMap(), userUtil.getGithubProfiles(), repoUtil.getGithubRepos(), (permissions, users, repos) => {
                orgMap.users = users.reduce((users, user) => {
                    users[user.username] = user;
                    return users;
                }, {});
                repos.forEach(repo => {
                    var perms = permissions[repo.id];
                    orgMap[repo.id] = {
                        repo: repo,
                        users: perms
                    };
                    resolve(orgMap);
                });
            });
        });
    }
};
