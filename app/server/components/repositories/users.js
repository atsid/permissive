'use strict';

var svcPath = '../services/github',
    mock = process.env.SERVICE === 'mock' ? '.mock' : '',
    github = require(svcPath + mock),
    Bluebird = require('bluebird'),
    permissionLevels = {
        admin: 3,
        push: 2,
        pull: 1,
        none: 0
    };

function convertGithubUser(user) {
    return {
        username: user.login,
        name: user.name,
        avatar_url: user.avatar_url
    };
}

function getGithubUser(username) {
    return github.getUser({
        'user': username
    }).then((user) => {
        return convertGithubUser(user);
    });
}

function getGithubUsers() {
    return github.getUsers({
        org: github.config.org,
        per_page: 100
    });
}

function getGithubTeams() {
    return github.getTeams({
        org: github.config.org,
        per_page: 100
    });
}

function getGithubTeamMembers(teamId) {
    return github.getTeamMembers({
        id: teamId,
        org: github.config.org,
        per_page: 100
    });
}

function getGithubTeamRepos(teamId) {
    return github.getTeamRepos({
        id: teamId,
        org: github.config.org,
        per_page: 100
    });
}

function isPermissiveManaged(team, repo) {
    let name = team.name,
        prefix = 'zzz-permissive-repo-' + repo.name + '-';

    return (name.indexOf(prefix) === 0);
}

function getDefaultPermissions() {
    return { github: 'none', permissive: 'none'};
}

function getPermissionMap() {

    let repositoryMap = {};
    return getGithubTeams().then((teams) => {

        let rosters = [];
        teams.forEach((team) => {

            rosters.push(getGithubTeamMembers(team.id).then((roster) => {

                let teamPermission = team.permission;

                return getGithubTeamRepos(team.id).then((repos) => {

                    repos.forEach((repo) => {

                        let repoId = repo.id,
                            permissiveManaged = isPermissiveManaged(team, repo),
                            userMap = repositoryMap[repoId];

                        if (!userMap) {
                            userMap = repositoryMap[repoId] = {};
                        }

                        roster.forEach((member) => {
                            let username = member.login,
                                permission = userMap[username],
                                current;

                            if (!permission) {
                                permission = userMap[username] = getDefaultPermissions();
                            }

                            if (permissiveManaged) {
                                current = permission.permissive;
                                if (permissionLevels[teamPermission] > permissionLevels[current]) {
                                    permission.permissive = teamPermission;
                                }
                            } else {
                                current = permission.github;
                                if (permissionLevels[teamPermission] > permissionLevels[current]) {
                                    permission.github = teamPermission;
                                }
                            }
                        });
                    });
                });
            }));
        });

        return Bluebird.all(rosters).then(() => {
            return repositoryMap;
        });
    });
}


module.exports = {

    getUsers () {
        return getGithubUsers().then((users) => {
            let profiles = [];
            users.forEach((user) => {
                profiles.push(getGithubUser(user.login).then((profile) => {
                    user.name = profile.name;
                }));
            });
            return Bluebird.all(profiles).then(() => {
                return users.map((user) => {
                    return convertGithubUser(user);
                });
            });
        });
    },

    getUser (username) {
        return getGithubUser(username);
    },

    getPermissions (repoId, users) {
        return getPermissionMap().then((map) => {
            let userMap = map[repoId];
            users.forEach((user) => {
                user.permission = userMap[user.username] || getDefaultPermissions();
            });
            return users;
        });
    }
};
