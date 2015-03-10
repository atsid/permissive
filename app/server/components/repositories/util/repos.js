'use strict';

var svcPath = '../../services/github',
    mock = process.env.SERVICE === 'mock' ? '.mock' : '',
    github = require(svcPath + mock),
    getDefaultRepoArgs,
    convertGithubRepo;


getDefaultRepoArgs = () => {
    return {
        org: github.config.org,
        per_page: 100
    };
};

convertGithubRepo = (repo) => {
    return {
        'id': repo.id,
        'name': repo.name,
        'description': repo.description,
        'public': !repo.private
    };
};

module.exports = {

    convertGithubRepo: convertGithubRepo,

    getGithubRepos () {
        let args = getDefaultRepoArgs();
        return github.getRepos(args);
    },

    getGithubRepo (repoId) {
        let args = getDefaultRepoArgs();
        return github.getRepos(args).then(repos => {
            let id = parseInt(repoId, 10);
            return repos.find(repo => repo.id === id);
        });
    }

};
