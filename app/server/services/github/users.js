'use strict';

var GitHubApi = require('github'),
    username = process.env.GITHUB_USER,
    password = process.env.GITHUB_PASSWORD,
    org = 'atsid',
    github;

var temp;

github = new GitHubApi({
    version: '3.0.0',
    protocol: 'https',
    host: 'api.github.com',
    timeout: 5000,
    headers: {
        'user-agent': username
    }
});

github.authenticate({
    type: 'basic',
    username: username,
    password: password
});

module.exports = {
    get: function (callback) {
        github.orgs.getMembers({
            user: username,
            org: org,
            perPage: 100
        }, function (err, res) {
            callback(null, res);
            console.log('github getMembers returned', res.length, 'users');
        });
    }
};
