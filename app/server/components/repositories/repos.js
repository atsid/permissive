'use strict';

var repoUtil = require('./util/repos');

module.exports = {

    getRepos () {
        return repoUtil.getGithubRepos();
    },

    getRepo (repoId) {
        return repoUtil.getGithubRepo(repoId);
    }

};
