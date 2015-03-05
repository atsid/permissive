'use strict';

var github = require('../services/github');

module.exports = {
    getUsers: () => {
        return github.getUsers({
            org: github.config.org
        });
    },

    getUser: (username) => {
        return github.getUser({
            user: username
        });
    }
};
