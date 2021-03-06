'use strict';

var provider = require('./provider'),
    userUtil = require('./users');

module.exports = {

    getGithubTeams () {
        let args = provider.getDefaultListArgs();
        return provider.github.getTeams(args);
    },

    getGithubTeam (teamId) {
        let args = provider.getDefaultItemArgs();
        args.id = teamId;
        return provider.github.getTeam(args);
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
