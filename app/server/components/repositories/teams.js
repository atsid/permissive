'use strict';

var permUtil = require('./util/permissions'),
    repoUtil = require('./util/repos'),
    userUtil = require('./util/users'),
    teamUtil = require('./util/teams'),
    debug = require('debug')('app:repositories:teams'),
    Bluebird = require('bluebird'),
    getPrefix,
    getTeam,
    convertGithubRepo,
    convertGithubUser;

getPrefix = (repo) => {
    return 'zzz-permissive-repo-' + repo.name + '-';
};

getTeam = (teams, prefix, permission) => {
    let name = prefix + permission;
    return teams.find(team => team.name === name);
};

// TODO: move these into the utility module if merging
convertGithubRepo = (repo) => {
    return {
        'id': repo.id,
        'name': repo.name,
        'full_name': repo.full_name,
        'description': repo.description,
        'public': !repo.private
    };
};

convertGithubUser = (user) => {
    return {
        username: user.login,
        name: user.name,
        avatar_url: user.avatar_url
    };
};

module.exports = {

    getTeams () {
        return new Promise((resolve, reject) => {
            teamUtil.getGithubTeams().then((teams) => {
                let teamRepos = teams.map((team) => teamUtil.getGithubTeamRepos(team.id).then((repos) => team.repos = repos.map((repo) => convertGithubRepo(repo))));
                let teamUsers = teams.map((team) => teamUtil.getGithubTeamMembers(team.id).then((users) => team.users = users.map((user) => convertGithubUser(user))));
                Bluebird.all(teamRepos, teamUsers).then(() => resolve(teams));
            });
        });
    },

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
                current = users[username] || permUtil.getDefaultPermission();

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
