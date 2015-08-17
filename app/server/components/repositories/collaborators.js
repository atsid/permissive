'use strict';

var teamUtil = require('./util/teams'),
	repoUtil = require('./util/repos'),
    userUtil = require('./util/users'),
    Bluebird = require('bluebird');

module.exports = {

    removeCollaboratorFromRepo(repo, user) {
        return repoUtil.removeCollaborator(repo, user);
    },

    addCollaboratorToRepo(repo, user) {
        return repoUtil.addCollaborator(repo, user);
    }

//    addCollaboratorsFromTeam(teamId) {
//        return new Promise((resolve, reject) => {
//            Bluebird.join(teamUtil.getGithubTeam(teamId), teamUtil.getGithubTeamRepos(teamId), teamUtil.getGithubTeamMembers(teamId), (team, repos, users) => {
//                // for each repo on the team add each user as a collaborator with this team's permissions
//                let permission = team.permission,
//                    collabs = [];
//                repos.forEach((repo) => {
//                    users.forEach((user) => {
//                        console.log('Adding Collaborator: ' + repo.name + ' ' + user.login + ' ' + permission);
//                        collabs.push(repoUtil.addCollaborator(repo.name, user.login, permission));
//                    });
//                });
//                resolve(Bluebird.all(collabs));
//            });
//        });
//    }
};
