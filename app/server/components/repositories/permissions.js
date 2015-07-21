'use strict';

var permUtil = require('./util/permissions');

module.exports = {

    /**
     * Gets the Repo Permission for the User
     */
    getUserPermissionForRepo (username, repoId) {
        return permUtil.getPermissionMap().then(permissions => {
            let repo = permissions[repoId];
            return repo[username] || permUtil.getDefaultPermissions();
        });
    },

    /**
     * Sets the Permission for a specific Repo on each User in the list
     */
    setRepoPermissionForUsers (users, repoId) {
        return permUtil.getPermissionMap().then(permissions => {
            let repo = permissions[repoId];
            users.forEach(user => {
                user.permission = repo[user.username] || permUtil.getDefaultPermissions();
            });
            return users;
        });
    },

    /**
     * Gets a list of Permissions by Repo for the User,
     */
    getRepoPermissionsForUser (repos, username) {
        return permUtil.getPermissionMap().then(permissions => {
            let map = {};
            repos.forEach(repo => {
                let defaults = permUtil.getDefaultPermissions();
                map[repo.id] = permissions[repo.id] ? permissions[repo.id][username] || defaults : defaults;
            });
            return map;
        });
    },

    /**
     * Sets the Permission for a specific User on each Repo in the list
     */
    setUserPermissionForRepos (repos, username) {
        return permUtil.getPermissionMap().then(permissions => {
            repos.forEach(repo => {
                let defaults = permUtil.getDefaultPermissions();
                repo.permission = permissions[repo.id] ? permissions[repo.id][username] || defaults : defaults;
            });
            return repos;
        });
    },

    filterReposByUserPermission (repos, username) {
        return permUtil.getPermissionMap().then(permissions => {
            return repos.filter(repo => {
                let defaults = permUtil.getDefaultPermissions();
                let permission = permissions[repo.id] ? permissions[repo.id][username] || defaults : defaults;
                return !(permission.github === 'none' && permission.permissive === 'none');
            });
        });
    }

};
