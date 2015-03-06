'use strict';

var github = require('../services/github');

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
