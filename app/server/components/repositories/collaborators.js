'use strict';

var teamUtil = require('./util/teams'),
	repoUtil = require('./util/repos'),
    userUtil = require('./util/users'),
    Bluebird = require('bluebird');

module.exports = {

    getUser (username) {
        return new Promise((resolve, reject) => {
            userUtil.getGithubUser(username).then((user) => {
                resolve(user);
            });
        });
    },

    getUsers () {
        return userUtil.getGithubUsers().then(users => {
            let profiles = users.map(user => userUtil.getGithubUser(user.username).then(profile => user.name = profile.name));
            return Bluebird.all(profiles).then(() => users);
        });
    },

    isOrgMember (username) {
        return new Promise((resolve, reject) => {
            userUtil.isOrgMember(username).then(function (data) {
                resolve(data.meta.status === '204 No Content');
            });
        });
    },

    addCollaboratorsFromTeam(teamId) {
        return new Promise((resolve, reject) => {
            Bluebird.join(teamUtil.getGithubTeam(teamId), teamUtil.getGithubTeamRepos(teamId), teamUtil.getGithubTeamMembers(teamId), (team, repos, users) => {
                // for each repo on the team add each user as a collaborator with this team's permissions
                let permission = team.permission,
                    collabs = [];
                repos.forEach((repo) => {
                    users.forEach((user) => {
                        console.log('Adding Collaborator: ' + repo.name + ' ' + user.login + ' ' + permission);
                        collabs.push(repoUtil.addCollaborator(repo.name, user.username, permission));
                    });
                });
                resolve(Bluebird.all(collabs));
            });
        });
    }
};
