'use strict';

var github = require('./github');

module.exports = {
    get: function () {
        return github.getMembers({
            user: github.config.username,
            org: github.config.org,
            per_page: 100
        });
    }
};
