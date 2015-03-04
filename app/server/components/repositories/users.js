'use strict';

var github = require('../services/github');

module.exports = {
    getUsers: function () {
        return github.getMembers({
            user: github.config.username,
            org: github.config.org,
            per_page: 100
        });
    },

    getUser: function (username) {
        return github.getFrom({
            user: username
        });
    }
};
