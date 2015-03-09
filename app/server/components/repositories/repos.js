'use strict';

var svcPath = '../services/github',
    mock = process.env.SERVICE === 'mock' ? '.mock' : '',
    github = require(svcPath + mock);

module.exports = {
    getRepos () {
        return github.getRepos({
            org: github.config.org,
            per_page: 100
        });
    },

    getTeams () {
        return github.getTeams({
            org: github.config.org,
            per_page: 100
        });
    },

    getTeamMembers (teamId) {
        return github.getTeamMembers({
            id: teamId,
            org: github.config.org,
            per_page: 100
        });
    },

    getTeamRepos (teamId) {
        return github.getTeamRepos({
            id: teamId,
            org: github.config.org,
            per_page: 100
        });
    }

};
