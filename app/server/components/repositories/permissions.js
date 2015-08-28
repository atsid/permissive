'use strict';

var permUtil = require('./util/permissions'),
    repoUtil = require('./util/repos'),
    Bluebird = require('bluebird');

module.exports = {

    /**
     * Gets the Org permissions map
     */
    getOrganization () {
        return permUtil.getPermissionMap();
    },

    /**
     * Gets the Repo Permission for the User
     */
    getUserPermissionForRepo (username, repoId) {
        return repoUtil.getRepoCollaborators(repoId).then(collaborators => {
            let collaborator = collaborators[username];
            return collaborator ? collaborator.permission : permUtil.getDefaultPermission();
        });
    },

    /**
     * Gets the Permission for a specific Repo on each User in the list
     */
    getRepoPermissionForUsers (users, repoId) {
        return new Promise((resolve, reject) => {
            let permUsers = users.map((user) => this.getUserPermissionForRepo(user.username, repoId).then((permission) => user.permission = permission));
            Bluebird.all(permUsers).then(() => resolve(users));
        });
    },

    /**
     * Gets the repos and associated permissions for a user.
     */
    getReposPermissionsForUser (repos, username) {
        return new Promise((resolve, reject) => {
            let map = {}, permUsers = repos.map((repo) => this.getUserPermissionForRepo(username, repo.id).then((permission) => map[repo.id] = permission));
            Bluebird.all(permUsers).then(() => resolve(map));
        });
    },

    /**
     * Gets the Permission for a specific User on each Repo in the list
     */
    getUserPermissionForRepos (repos, username) {
        return new Promise((resolve, reject) => {
            let permUsers = repos.map((repo) => this.getUserPermissionForRepo(username, repo.id).then((permission) => repo.permission = permission));
            Bluebird.all(permUsers).then(() => resolve(repos));
        });
    },

    /**
     * Add remove or update a user's permission for a repo
     */
    editUserPermissionForRepo(username, repoId, permission) {
        if (permission === 'none') {
            return repoUtil.removeRepoCollaborator(repoId, username);
        }
        return repoUtil.addRepoCollaborator(repoId, username, permission);
    }
};
