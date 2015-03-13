'use strict';

var permUtil = require('./util/permissions');

module.exports = {

    getUserPermissionForRepo (username, repoId) {
        return permUtil.getPermissionMap().then(permissions => {
            let repo = permissions[repoId];
            return repo[username] || permUtil.getDefaultPermissions();
        });
    },

    setRepoPermissionForUsers (users, repoId) {
        return permUtil.getPermissionMap().then(permissions => {
            let repo = permissions[repoId];
            users.forEach(user => {
                user.permission = repo[user.username] || permUtil.getDefaultPermissions();
            });
            return users;
        });
    },

    getRepoPermissionsForUser (repos, username) {
        return permUtil.getPermissionMap().then(permissions => {
            let map = {};
            repos.map(repo => {
                map[repo.id] = permissions[repo.id][username] || permUtil.getDefaultPermissions();
            });
            return map;
        });
    },

    setUserPermissionForRepos (repos, username) {
        return permUtil.getPermissionMap().then(permissions => {
            repos.forEach(repo => {
                let permission = permissions[repo.id];
                repo.permission = permission[username] || permUtil.getDefaultPermissions();
            });
            return repos;
        });
    }

};
