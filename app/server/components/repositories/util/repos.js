'use strict';

var provider = require('./provider'),
    convertGithubRepo;

convertGithubRepo = (repo) => {
    return {
        'id': repo.id,
        'name': repo.name,
        'description': repo.description,
        'public': !repo.private
    };
};

module.exports = {

    getGithubRepos () {
        let args = provider.getDefaultListArgs();
        return provider.github.getRepos(args).then(repos => repos.map(repo => convertGithubRepo(repo)));
    }

};
