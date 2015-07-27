'use strict';

var provider = require('./provider'),
    Bluebird = require('bluebird'),
    convertGithubRepo,
    convertGithubCollaborator,
    getPermissions;

convertGithubRepo = (repo) => {
    return {
        'id': repo.id,
        'name': repo.name,
        'full_name': repo.full_name,
        'description': repo.description,
        'public': !repo.private,
        'collaborators': repo.collaborators
    };
};

convertGithubCollaborator = (collaborator) => {
    return {
        username: collaborator.login,
        permissions: getPermissions(collaborator.permissions)
    };
};

getPermissions = (permissions) => {
    let permission = 'pull';
    if (permissions.admin) {
        permission = 'admin';
    } else if (permissions.push) {
        permission = 'push';
    }
    return permission;
};

module.exports = {

    getGithubRepos () {
        let args = provider.getDefaultListArgs();
        return provider.github.getRepos(args).then(repos => repos.map(repo => convertGithubRepo(repo)));
    },

    getGithubReposWithCollaborators() {
        let args = provider.getDefaultListArgs();
        return new Promise((resolve, reject) => {
            provider.github.getRepos(args).then((repos) => {
                let profiles = repos.map(repo => provider.github.getCollaborators({
                    user: provider.github.config.org,
                    repo: repo.name
                }).then(collaborators => {
                    repo.collaborators = collaborators.reduce((collabs, collab) => {
                        collabs[collab.login] = convertGithubCollaborator(collab);
                        return collabs;
                    }, {});
                }));
                Bluebird.all(profiles).then(() => resolve(repos.map(repo => convertGithubRepo(repo))));
            });
        });
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

    getRepoCollaborators(repoId) {
        return new Promise((resolve, reject) => {
            this.getRepoById(repoId).then((repo) => {
                provider.github.getCollaborators({
                    user: provider.github.config.org,
                    repo: repo.name
                }).then((collaborators) => {
                    resolve(collaborators.reduce((collabs, collab) => {
                        collabs[collab.login] = convertGithubCollaborator(collab);
                        return collabs;
                    }, {}));
                });
            });
        });
    },

    getCollaborator(repo, username) {
        let args = provider.getDefaultItemArgs();
        args.user = provider.github.config.org;
        args.repo = repo;
        args.collabuser = username;
        provider.github.getCollaborator(args);
    },

    removeCollaborator(repo, username) {
        let args = provider.getDefaultItemArgs();
        args.user = provider.github.config.org;
        args.repo = repo;
        args.collabuser = username;
        provider.github.removeCollaborator(args);
    },

    addCollaborator(repo, username, permission) {
        let args = provider.getDefaultItemArgs();
        args.user = provider.github.config.org;
        args.repo = repo;
        args.collabuser = username;
        args.permission = permission;
        provider.github.addCollaborator(args);
    }
};
