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
 * Note also that we are storing some mappings here that aren't GitHub APi properties, and have prefixed those with '_'.
 */
//jscs:disable disallowDanglingUnderscores
var mask = require('json-mask'),
    users = {
        'testuser1': {
            login: 'testuser1',
            name: 'Test User 1',
            avatar_url: 'https://avatars0.githubusercontent.com/u/25254?v=3&s=400'
        },
        'testuser2': {
            login: 'testuser2',
            name: 'Test User 2',
            avatar_url: 'https://avatars1.githubusercontent.com/u/2741?v=3&s=400'
        },
        'testuser3': {
            login: 'testuser3',
            name: 'Test User 3',
            avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=3&s=400'
        }
    },
    repos = {
        '1': {
            id: 1,
            name: 'Test-Repo-1',
            description: 'A library for managing file io.',
            private: false
        },
        '2': {
            id: 2,
            name: 'Test-Repo-2',
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
        '3':{
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
        }
};

module.exports = {

    config: {
        org: process.env.GITHUB_ORG
    },

    getUsers () {
        console.log('looking up mock users');
        return new Promise((resolve, reject) => {

            let list = Object.keys(users).map((key) => mask(users[key], 'login,avatar_url'));

            resolve(list);
        });
    },

    getUser (msg) {
        let username = msg.user;
        console.log('looking up mock user [' + username + ']');
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
        console.log('looking up mock repos');
        return new Promise((resolve, reject) => {

            let list = Object.keys(repos).map((key) => repos[key]);

            resolve(list);
        });
    },

    getTeams () {
        console.log('looking up mock teams');
        return new Promise((resolve, reject) => {

            let list = Object.keys(teams).map((key) => mask(teams[key], 'id,name,permission'));

            resolve(list);
        });
    },

    getTeamMembers (msg) {
        let id = msg.id;
        console.log('looking up mock team [' + id + '] members');
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
        console.log('looking up mock team [' + id + '] repos');
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

    addTeamMember (msg) {
        let id = msg.id,
            username = msg.user;
        console.log('adding mock user [' + username + '] to mock team [' + id + ']');

        return new Promise((resolve, reject) => {

            let team = teams[id];

            if (team) {

                let found = team._users.find(user => user === username);
                if (found) {
                    reject(new Error('User [' + username + '] already on team: ' + id));
                }

                team._users.push(username);
                resolve();
            } else {
                reject(new Error('No mock team: ' + id));
            }
        });
    },

    deleteTeamMember (msg) {
        let id = msg.id,
            username = msg.user;
        console.log('removing mock user [' + username + '] from mock team [' + id + ']');

        return new Promise((resolve, reject) => {

            let team = teams[id];

            if (team) {

                let found = team._users.find(user => user === username);
                if (!found) {
                    reject(new Error('User [' + username + '] is not on team: ' + id));
                }

                team._users = team._users.filter(user => user !== username);
                resolve();
            } else {
                reject(new Error('No mock team: ' + id));
            }
        });
    }
};
