'use strict';

var repoUtil = require('./util/repos'),
    permUtil = require('./util/permissions');

module.exports = {

    getRepos () {
        return repoUtil.getGithubRepos();
    },

    getRepo (repoId) {
        return repoUtil.getGithubRepo(repoId);
    },

    getPermissions (username, repos) {
        return permUtil.getPermissionMap().then(map => {
            repos.forEach(repo => {
                let repoPermissionMap = map[repo.id];
                repo.permission = repoPermissionMap[username] || permUtil.getDefaultPermissions();
            });
            return repos;
        });
    }

};
