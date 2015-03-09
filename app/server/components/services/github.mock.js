'use strict';

/**
 * Mock version of the GitHub service wrapper we've written.
 * Methods map from raw GitHub API methods (as exposed through node-github) to our business methods.
 * The components/repositories bubble that up to higher-level business logic and domain models.
 */
var users = [{
    login: 'testuser1',
    name: 'Test User 1',
    avatar_url: 'https://avatars0.githubusercontent.com/u/25254?v=3&s=400'
}, {
    login: 'testuser2',
    name: 'Test User 2',
    avatar_url: 'https://avatars1.githubusercontent.com/u/2741?v=3&s=400'
}],
    repos = [{
    id: 1,
    name: 'Test Repo 1',
    description: 'A library for managing file io.',
    private: false
}, {
    id: 2,
    name: 'Test Repo 2',
    private: true
}];

module.exports = {

    config: {
        org: process.env.GITHUB_ORG
    },

    getUsers () {
        console.log('looking up mock users');
        return new Promise((resolve, reject) => {
            resolve(users);
        });
    },

    getUser (msg) {
        let username = msg.user;
        console.log('looking up mock user [' + username + ']');
        return new Promise((resolve, reject) => {
            let user = users.find((item) => item.login === username);
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
            resolve(repos);
        });
    }
};
