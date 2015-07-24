'use strict';

var provider = require('./provider'),
    convertGithubRepo;

convertGithubRepo = (repo) => {
    return {
        'id': repo.id,
        'name': repo.name,
        'full_name': repo.full_name,
        'description': repo.description,
        'public': !repo.private
    };
};

module.exports = {

    getGithubRepos () {
        let args = provider.getDefaultListArgs();
        return provider.github.getRepos(args).then(repos => repos.map(repo => convertGithubRepo(repo)));
    },

    getRepoById(repoId) {

        return new Promise((resolve, reject) => {

            this.getGithubRepos().then((repos) => {

                //repoId is coming in as a string, hence coercion
                let id = parseInt(repoId),
                    repo = repos.find(r => r.id === id);

                resolve(repo);

            });

        });

    },

    isCollaborator(repo, username) {
        let args = provider.getDefaultItemArgs();
        args.repo = repo;
        args.username = username;
        provider.github.getCollaborator(args);
    },

    removeCollaborator(repo, username) {
        let args = provider.getDefaultItemArgs();
        args.repo = repo;
        args.username = username;
        provider.github.removeCollaborator(args);
    },

    addCollaborator(repo, username, permission) {
        let args = provider.getDefaultItemArgs();
        args.repo = repo;
        args.username = username;
        args.permission = permission;
        provider.github.addCollaborator(args);
    }

};
