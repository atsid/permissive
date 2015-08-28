'use strict';

var userUtil = require('./util/users'),
    teamUtil = require('./util/teams'),
    debug = require('debug')('app:repositories:teams'),
    Bluebird = require('bluebird'),
    convertGithubRepo,
    convertGithubUser;

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

    getTeams () {
        return new Promise((resolve, reject) => {
            teamUtil.getGithubTeams().then((teams) => {
                let teamRepos = teams.map((team) => teamUtil.getGithubTeamRepos(team.id).then((repos) => team.repos = repos.map((repo) => convertGithubRepo(repo))));
                let teamUsers = teams.map((team) => teamUtil.getGithubTeamMembers(team.id).then((users) => team.users = users));
                Bluebird.all(teamRepos, teamUsers).then(() => resolve(teams));
            });
        });
    }
};
