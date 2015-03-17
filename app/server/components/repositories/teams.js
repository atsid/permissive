'use strict';

var permUtil = require('./util/permissions'),
    repoUtil = require('./util/repos'),
    teamUtil = require('./util/teams'),
    debug = require('debug')('app:repositories:teams'),
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


    //checks if a permissive team exists to manage a given repo at specified permission
    check (repoId, permission) {

        return new Promise((resolve, reject) => {

            debug('checking if team exists for repo [' + repoId + '] at [' + permission + ']');

            repoUtil.getRepoById(repoId).then((repo) => {

                let prefix = getPrefix(repo);

                teamUtil.getGithubTeams().then((teams) => {

                    let team = getTeam(teams, prefix, permission);
                    resolve(typeof team !== 'undefined');

                });

            });

        });

    },

    //create a team for a given repo and permission
    create (repoId, permission) {

        return new Promise((resolve, reject) => {

            debug('creating team for [' + repoId + '] at [' + permission + ']');

            repoUtil.getRepoById(repoId).then((repo) => {

                teamUtil.createGithubTeamForRepoPermission(repo, permission).then((team) => {

                    debug('created team [', team.id + ']');
                    resolve(team);

                }).catch((err) => {
                    reject(err);
                });

            });

        });

    },

    edit (username, repoId, permission) {

        debug('editing user [' + username + '] permission on team for repo [' + repoId + '] to permission [' + permission + ']');
        // get permission map
        return permUtil.getPermissionMap().then(map => {

            let users = map[repoId],
                current = users[username] || permUtil.getDefaultPermissions();

            // user already on the team
            if (current.permissive === permission) {
                return;
            }

            // need repo name and team id
            return repoUtil.getRepoById(repoId).then(repo => {
                let prefix = getPrefix(repo);
                return teamUtil.getGithubTeams().then(teams => {
                    let oldTeam = getTeam(teams, prefix, current.permissive),
                        newTeam = getTeam(teams, prefix, permission);

                    // remove-only, don't add to new team
                    if (permission === 'none') {
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
    }

};
