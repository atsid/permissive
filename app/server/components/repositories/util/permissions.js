'use strict';

var teamUtil = require('./teams'),
    userUtil = require('./users'),
    Bluebird = require('bluebird'),
    clone = require('clone'),
    permissionLevels = {
        admin: 3,
        push: 2,
        pull: 1,
        none: 0
    },
    isPermissiveManaged,
    getDefaultPermissions;

isPermissiveManaged = (team, repo) => {
    let name = team.name,
        prefix = 'zzz-permissive-repo-' + repo.name + '-';

    return (name.indexOf(prefix) === 0);
};

getDefaultPermissions = () => {
    return {
        github: 'none',
        permissive: 'none'
    };
};

module.exports = {

    getDefaultPermissions: getDefaultPermissions,

    getPermissionMap () {
        let repositoryMap = {};

        return userUtil.getGithubUsers().then(users => {

            let allUsers = {},
                publicAllUsers = {};
            users.forEach(user => {
                allUsers[user.username] = getDefaultPermissions();
                publicAllUsers[user.username] = getDefaultPermissions();
                publicAllUsers[user.username].github = 'pull';
            });

            return teamUtil.getGithubTeams().then(teams => {

                let rosters = [];
                teams.forEach(team => {

                    rosters.push(teamUtil.getGithubTeamMembers(team.id).then(roster => {

                        let teamPermission = team.permission;
                        return teamUtil.getGithubTeamRepos(team.id).then(repos => {

                            repos.forEach(repo => {

                                let repoId = repo.id,
                                    permissiveManaged = isPermissiveManaged(team, repo),
                                    userMap = repositoryMap[repoId];

                                if (!userMap) {
                                    userMap = repositoryMap[repoId] = (repo.private === false) ? clone(publicAllUsers) : clone(allUsers);
                                }

                                roster.forEach(member => {

                                    let username = member.login,
                                        permission = userMap[username],
                                        current;

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

                return Bluebird.all(rosters).then(() => repositoryMap);
            });

        });

    }
};
