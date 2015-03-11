'use strict';

var permUtil = require('./util/permissions'),
    repoUtil = require('./util/repos'),
    teamUtil = require('./util/teams'),
    getPrefix,
    getTeam;

getPrefix = (repo) => {
    return 'zzz-permissive-repo-' + repo.name + '-';
};

getTeam = (teams, prefix, permission) => {
    let name = prefix + permission;
    return teams.find(team => team.name === name);
};

module.exports = {

    edit (username, repoId, team) {

        // get permission map
        return permUtil.getPermissionMap().then(map => {

            let users = map[repoId],
                current = users[username];

            // user already on the team
            if (current.permissive === team) {
                return new Error('User already assigned the desired permission');
            }

            // need repo name and team id
            return repoUtil.getGithubRepo(repoId).then(repo => {
                let prefix = getPrefix(repo);
                return teamUtil.getGithubTeams().then(teams => {
                    let oldTeam = getTeam(teams, prefix, current.permissive),
                        newTeam = getTeam(teams, prefix, team);

                    // remove-only, don't add to new team
                    if (team === 'none') {
                        return teamUtil.removeFromGithubTeam(username, oldTeam.id);
                    }

                    // add-only, not currently on a team
                    if (current.permissive === 'none') {
                        return teamUtil.addToGithubTeam(username, newTeam.id);
                    }

                    // remove from current team, add to new team
                    return teamUtil.removeFromGithubTeam(username, oldTeam.id).then(() => teamUtil.addToGithubTeam(username, newTeam.id));
                });
            });
        });
    },

    remove (username, repoId, team) {

        // get permission map
        return permUtil.getPermissionMap().then(map => {

            let users = map[repoId],
                current = users[username];

            if (team === 'none') {
                return new Error('Cannot remove none permission');
            }

            // user not on the team
            if (current.permissive !== team) {
                return new Error('User does not have the permission you want to remove');
            }

            // need repo name and team id
            return repoUtil.getGithubRepo(repoId).then(repo => {
                let prefix = getPrefix(repo);
                return teamUtil.getGithubTeams().then(teams => {
                    let oldTeam = getTeam(teams, prefix, current.permissive);
                    return teamUtil.removeFromGithubTeam(username, oldTeam.id);
                });
            });
        });
    }
};
