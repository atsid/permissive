'use strict';

var repoUtil = require('./util/repos'),
    permUtil = require('./util/permissions');

module.exports = {

    getRepos () {
        return repoUtil.getGithubRepos().then(repos => repos.map(repo => repoUtil.convertGithubRepo(repo)));
    },

    getRepo (repoId) {
        return repoUtil.getGithubRepo(repoId).then(repo => repoUtil.convertGithubRepo(repo));
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
