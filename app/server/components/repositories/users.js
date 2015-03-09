'use strict';

var svcPath = '../services/github',
    mock = process.env.SERVICE === 'mock' ? '.mock' : '',
    github = require(svcPath + mock);

module.exports = {
    getUsers () {
        return github.getUsers({
            org: github.config.org,
            per_page: 100
        });
    },

    getUser (username) {
        return github.getUser({
            user: username
        });
    }
};
