'use strict';

var github = require('../services/github');

module.exports = {
    getRepos: () => {
        return github.getRepos({
            org: github.config.org
        });
    }
};
