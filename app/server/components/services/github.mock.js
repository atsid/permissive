'use strict';

/**
 * Mock version of the GitHub service wrapper we've written.
 * Methods map from raw GitHub API methods (as exposed through node-github) to our business methods.
 * The components/repositories bubble that up to higher-level business logic and domain models.
 *
 * Note that each mock object list is a hash for easier lookups when the business logic is slightly more complex.
 * Therefore, the list methods generally map from Object.keys to a list. IDs are duplicated as keys to minimize object manipulation required.
 *
 * These per-object maps have all the info for an object type that we might get from one or more GitHub API calls.
 * Masking is used at each mock method to limit to the fields that are available for a given API method.
 * For example, the user list API method includes login and avatar_url, but does not include the name.
 *
 * Note also that we are storing some mappings here that aren't GitHub API properties, and have prefixed those with '_'.
 */
//jscs:disable disallowDanglingUnderscores
var mask = require('json-mask'),
    debug = require('debug')('app:services:github-mock'),
    org = 'testorg',
    users = {
        'testuser1': {
            login: 'testuser1',
            name: 'TJ',
            avatar_url: 'https://avatars0.githubusercontent.com/u/25254?v=3&s=400',
            permissions: {
                admin: true,
                push: true
            }
        },
        'testuser2': {
            login: 'testuser2',
            name: 'DHH',
            avatar_url: 'https://avatars1.githubusercontent.com/u/2741?v=3&s=400',
            permissions: {
                push: true
            }
        },
        'testuser3': {
            login: 'testuser3',
            name: 'Wanstrath',
            avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=3&s=400',
            permissions: {
                push: true
            }
        },
        'testuser4': {
            login: 'testuser4',
            name: 'Linus',
            avatar_url: 'https://avatars3.githubusercontent.com/u/1024025?v=3&s=400',
            permissions: {
                pull: true
            }
        }
    },
    owners = {
        'testuser3': {
            login: 'testuser3',
            name: 'Wanstrath',
            avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=3&s=400',
            owner: true
        }
    },
    collaborators = {
        'Test-Repo-1': [users.testuser3, users.testuser4],
        'Test-Repo-2': [users.testuser1, users.testuser2]
    },
    repos = {
        '1': {
            id: 1,
            name: 'Test-Repo-1',
            full_name: org + '/' + 'Test-Repo-1',
            description: 'A library for managing file io.',
            private: false
        },
        '2': {
            id: 2,
            name: 'Test-Repo-2',
            full_name: org + '/' + 'Test-Repo-2',
            private: true
        }
    },
    teams = {
        '1': {
            id: 1,
            name: 'Contributors',
            permission: 'push',
            _repos: [1, 2],
            _users: ['testuser1']
        },
        '2': {
            id: 2,
            name: 'zzz-permissive-repo-Test-Repo-1-pull',
            permission: 'pull',
            _repos: [1],
            _users: ['testuser1']
        },
        '3': {
            id: 3,
            name: 'zzz-permissive-repo-Test-Repo-1-push',
            permission: 'push',
            _repos: [1],
            _users: ['testuser2']
        },
        '4': {
            id: 4,
            name: 'zzz-permissive-repo-Test-Repo-1-admin',
            permission: 'admin',
            _repos: [1],
            _users: ['testuser3']
        },
        '5': {
            id: 5,
            name: 'zzz-permissive-repo-Test-Repo-2-admin',
            permission: 'admin',
            _repos: [2],
            _users: ['testuser3']
        }
    };

module.exports = {

    config: {
        org: org
    },

    //provide direct access to the data maps by other mock components
    users: users,

    owners: owners,

    repos: repos,

    teams: teams,

    getUsers (msg) {
        debug('looking up mock users');
        return new Promise((resolve, reject) => {
            var list;
            if (msg && msg.role === 'admin') {
                list = Object.keys(owners).map((key) => mask(owners[key], 'login,avatar_url,owner'));
                resolve(list);
            } else {
                list = Object.keys(users).map((key) => mask(users[key], 'login,avatar_url'));
                resolve(list);
            }
        });
    },

    getUser (msg) {
        let username = msg.user;
        debug('looking up mock user [' + username + ']');
        return new Promise((resolve, reject) => {

            let user = users[username];

            if (user) {
                resolve(user);
            } else {
                reject(new Error('No mock user: ' + username));
            }
        });
    },

    getRepos () {
        debug('looking up mock repos');
        return new Promise((resolve, reject) => {

            let list = Object.keys(repos).map((key) => repos[key]);

            resolve(list);
        });
    },

    getCollaborators (msg) {
        debug('looking up mock collaborators');
        return new Promise((resolve, reject) => {
            let list = collaborators[msg.repo];
            resolve(list);
        });
    },

    addCollaborator (msg) {
        debug('adding mock collaborator');
        let collabs = collaborators[msg.repo];
        return new Promise((resolve) => {
            collabs.push(users[msg.username]);
            resolve(collabs);
        });
    },

    removeCollaborator (msg) {
        debug('removing mock collaborator');
        let collabs = collaborators[msg.repo];
        return new Promise((resolve) => {
            var idx = collabs.map((c) => {
                return c.login;
            }).indexOf(msg.username);
            if (idx > -1) {
                collabs.splice(idx, 1);
            }
            resolve(collabs);
        });
    },

    getTeams () {
        debug('looking up mock teams');
        return new Promise((resolve, reject) => {

            let list = Object.keys(teams).map((key) => mask(teams[key], 'id,name,permission'));

            resolve(list);
        });
    },

    getTeamMembers (msg) {
        let id = msg.id;
        debug('looking up mock team [' + id + '] members');
        return new Promise((resolve, reject) => {

            let team = teams[id];

            if (team) {
                let teamMembers = team._users.map((username) => mask(users[username], 'login,avatar_url'));
                resolve(teamMembers);
            } else {
                reject(new Error('No mock team: ' + id));
            }
        });
    },

    getTeamRepos (msg) {
        let id = msg.id;
        debug('looking up mock team [' + id + '] repos');
        return new Promise((resolve, reject) => {

            let team = teams[id];

            if (team) {
                let teamRepos = team._repos.map((id) => repos[id]);
                resolve(teamRepos);
            } else {
                reject(new Error('No mock team: ' + id));
            }
        });
    },

    isOrgMember (msg) {
        return new Promise((resolve, reject) => {
            resolve({
                meta: {
                    status: '204 No Content'
                }
            });
        });
    }
};
