'use strict';

var svcPath = '../services/github',
    mock = process.env.SERVICE === 'mock' ? '.mock' : '',
    github = require(svcPath + mock),
    repoUtil = require('./util/repos'),
    permUtil = require('./util/permissions');

module.exports = {

    getRepos () {
        return repoUtil.getGithubRepos().then((repos) => {
            return repos.map((repo) => {
                return repoUtil.convertGithubRepo(repo);
            });
        });
    },

    getRepo (repoId) {
        return repoUtil.getGithubRepo(repoId).then((repo) => {
            return repoUtil.convertGithubRepo(repo);
        });
    },

    getPermissions (username, repos) {
        return permUtil.getPermissionMap().then((map) => {
            repos.forEach((repo) => {
                let repoPermissionMap = map[repo.id];
                repo.permission = repoPermissionMap[username] || permUtil.getDefaultPermissions();
            });
            return repos;
        });
    }

};
