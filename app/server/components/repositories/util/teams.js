'use strict';

var svcPath = '../../services/github',
    mock = process.env.SERVICE === 'mock' ? '.mock' : '',
    github = require(svcPath + mock),
    getDefaultArgs,
    getListArgs;

getDefaultArgs = () => {
    return {
        org: github.config.org
    };
};

getListArgs = () => {
    return {
        org: github.config.org,
        per_page: 100
    };
};


module.exports = {

    getGithubTeams () {
        let args = getListArgs();
        return github.getTeams(args);
    },

    getGithubTeamMembers (teamId) {
        let args = getListArgs();
        args.id = teamId;
        return github.getTeamMembers(args);
    },

    getGithubTeamRepos (teamId) {
        let args = getListArgs();
        args.id = teamId;
        return github.getTeamRepos(args);
    },

    addToGithubTeam(username, teamId) {
        let args = getDefaultArgs();
        args.id = teamId;
        args.user = username;
        return github.addTeamMember(args);
    },

    removeFromGithubTeam(username, teamId) {
        let args = getDefaultArgs();
        args.id = teamId;
        args.user = username;
        return github.deleteTeamMember(args);
    }

};
