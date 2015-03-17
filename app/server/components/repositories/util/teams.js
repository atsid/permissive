'use strict';

var provider = require('./provider');

let getPrefix = (repo) => {
    return 'zzz-permissive-repo-' + repo.name + '-';
};

module.exports = {

    getGithubTeams () {
        let args = provider.getDefaultListArgs();
        return provider.github.getTeams(args);
    },

    getGithubTeamMembers (teamId) {
        let args = provider.getDefaultListArgs();
        args.id = teamId;
        return provider.github.getTeamMembers(args);
    },

    getGithubTeamRepos (teamId) {
        let args = provider.getDefaultListArgs();
        args.id = teamId;
        return provider.github.getTeamRepos(args);
    },

    createGithubTeamForRepoPermission (repo, permission) {
        let args = provider.getDefaultListArgs();
        args.name = getPrefix(repo) + permission;
        args.repo_names = [repo.full_name];
        args.permission = permission;
        return provider.github.createTeam(args);
    },

    addToGithubTeam(username, teamId) {
        let args = provider.getDefaultItemArgs();
        args.id = teamId;
        args.user = username;
        return provider.github.addTeamMember(args);
    },

    removeFromGithubTeam(username, teamId) {
        let args = provider.getDefaultItemArgs();
        args.id = teamId;
        args.user = username;
        return provider.github.deleteTeamMember(args);
    }

};
