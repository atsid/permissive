'use strict';

var repoUtil = require('./repos'),
    userUtil = require('./users'),
    Bluebird = require('bluebird'),
    getDefaultPermission;

getDefaultPermission = () => {
    return "none";
};

module.exports = {

    getDefaultPermission: getDefaultPermission,

    /**
     * Returns all organization repos with an associated user list and corresponding user permissions.
     */
    getPermissionMap () {
        let orgMap = {};

        return new Promise((resolve, reject) => {
            Bluebird.join(userUtil.getGithubMembers(), userUtil.getGithubOwners(), repoUtil.getReposWithCollaborators(), (members, owners, repos) => {
                let users = members.concat(owners);
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
