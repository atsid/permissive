'use strict';

var userUtil = require('./util/users'),
    permUtil = require('./util/permissions'),
    Bluebird = require('bluebird');

module.exports = {

    getUsers () {
        return userUtil.getGithubUsers().then(users => {
            let profiles = users.map(user => userUtil.getGithubUser(user.login).then(profile => user.name = profile.name));
            return Bluebird.all(profiles).then(() => users.map(user => userUtil.convertGithubUser(user)));
        });
    },

    getUser (username) {
        return userUtil.getGithubUser(username);
    },

    getPermissions (repoId, users) {
        return permUtil.getPermissionMap().then(map => {
            let userMap = map[repoId];
            users.forEach(user => {
                user.permission = userMap[user.username] || permUtil.getDefaultPermissions();
            });
            return users;
        });
    },

    isMember (username) {
        console.log("isMember(" + username + ")");
        return userUtil.isMember(username).then(function (data) {
            return "204 No Content" === data.meta.success;
        });
    }
};
