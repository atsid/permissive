'use strict';

var github = require('../services/github');

module.exports = {
    getUsers () {
        return github.getMembers({
            org: github.config.org
        });
    },

    getUser (username) {
        return github.getFrom({
            user: username
        });
    }
};
