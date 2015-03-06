'use strict';

var github = require('../services/github');

module.exports = {

    client: github.client,

    getRepos: () => {
        return github.getRepos({
            org: github.config.org,
            per_page: 100
        });
    }
};
