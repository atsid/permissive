'use strict';

var userService = require('../components/repositories/users'),
    repoService = require('../components/repositories/repos'),
    Bluebird = require('bluebird');

module.exports = {

    listUsers (req, res, next) {
        console.log('listing users [' + req.path + ']');
        console.log('query:' + JSON.stringify(req.query, null, 2));

        userService.getUsers().then((users) => {
            let profiles = [];

            users.forEach((user) => {
                profiles.push(userService.getUser(user.login).then((profile) => {
                    user.name = profile.name;
                }));
            });

            Bluebird.all(profiles).then(() => {
                console.log('all user profiles retrieved');

                req.entity = users.map((user) => {
                    return {
                        username: user.login,
                        name: user.name,
                        avatar_url: user.avatar_url
                    };
                });

                next();
            });

        }).catch((err) => {
            next(err);
        });
    },

    listUsersPermission (req, res, next) {
        console.log('looking up repo permissions for users');

        let repoId = req.query.permission_repo,
            users = req.entity;

        if (repoId) {

            let repositoryMap = {};

            // get teams
            repoService.getTeams().then((teams) => {

                console.log('got the teams');

                let rosters = [];

                // get team members
                teams.forEach((team) => {

                    rosters.push(repoService.getTeamMembers(team.id).then((roster) => {

                        console.log('got team members:', team.name);

                        let teamPermission = team.permission;

                        return repoService.getTeamRepos(team.id).then((repos) => {

                            repos.forEach((repo) => {

                                console.log('got repo:', repo.name);

                                let repoId = repo.id,
                                    repoName = repo.name,
                                    permissiveManaged = (repoName.indexOf('zzz_permissive_repo_' + repoName + '_') === 0),
                                    userMap = repositoryMap[repoId];

                                if (!userMap) {
                                    userMap = repositoryMap[repoId] = {};
                                }

                                roster.forEach((member) => {

                                    let username = member.login,
                                        permission = userMap[username],
                                        current,
                                        permissionLevels = {
                                            admin: 3,
                                            push: 2,
                                            pull: 1,
                                            none: 0
                                        };

                                    if (!permission) {
                                        permission = repositoryMap[repoId][username] = { permissive: 'none', github: 'none' };
                                    }

                                    if (permissiveManaged) {
                                        current = permission.permissive;
                                        if (permissionLevels[teamPermission] > permissionLevels[current]) {
                                            repositoryMap[repoId][username].permissive = teamPermission;
                                        }
                                    } else {
                                        current = permission.github;
                                        if (permissionLevels[teamPermission] > permissionLevels[current]) {
                                            repositoryMap[repoId][username].github = teamPermission;
                                        }
                                    }
                                });
                            });
                        });
                    }));
                });

                Bluebird.all(rosters).then(() => {
                    console.log('got all the team members');
                    let userMap = repositoryMap[repoId];
                    users.forEach((user) => {
                        user.permission = userMap[user.username] || { permissive: 'none', github: 'none' };
                    });

                    next();
                });

            }).catch((err) => {
                next(err);
            });
        }

        next();
    },

    listUsersLinks (req, res, next) {
        console.log('checking for links on user list');

        let repo = req.query.permission_repo,
            users = req.entity;

        //TODO: of course, these links should only appear if logged in user has admin on the repo also
        if (repo) {
            users.forEach((user) => {
                user.links = [{
                    rel: 'edit-repo-permission',
                    href: 'users/' + user.username + '/repos/' + repo + '/permissions/{permission}',
                    method: 'PUT'
                }, {
                    rel: 'remove-repo-permission',
                    href: 'users/' + user.username + '/repos/' + repo,
                    method: 'DELETE'
                }];
            });
        }
        next();
    },

    readUser (req, res, next) {
        console.log('getting user [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        userService.getUser(req.params.username).then((profile) => {
            req.entity = {
                username: profile.login,
                name: profile.name,
                avatar_url: profile.avatar_url
            };

            next();

        }).catch((err) => {
            next(err);
        });
    }
};
