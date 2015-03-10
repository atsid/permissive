'use strict';

var teamUtil = require('./teams'),
    Bluebird = require('bluebird'),
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
        return teamUtil.getGithubTeams().then((teams) => {

            let rosters = [];
            teams.forEach((team) => {

                rosters.push(teamUtil.getGithubTeamMembers(team.id).then((roster) => {

                    let teamPermission = team.permission;

                    return teamUtil.getGithubTeamRepos(team.id).then((repos) => {

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

            return Bluebird.all(rosters).then(() => repositoryMap);
        });
    }
};
