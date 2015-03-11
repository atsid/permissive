'use strict';

var svcPath = '../../services/github',
    mock = process.env.SERVICE === 'mock' ? '.mock' : '',
    github = require(svcPath + mock),
    getDefaultTeamArgs;

getDefaultTeamArgs = () => {
    return {
        org: github.config.org,
        per_page: 100
    };
};

module.exports = {

    getGithubTeams () {
        let args = getDefaultTeamArgs();
        return github.getTeams(args);
    },

    getGithubTeamMembers (teamId) {
        let args = getDefaultTeamArgs();
        args.id = teamId;
        return github.getTeamMembers(args);
    },

    getGithubTeamRepos (teamId) {
        let args = getDefaultTeamArgs();
        args.id = teamId;
        return github.getTeamRepos(args);
    }

};
