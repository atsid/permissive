'use strict';

var svcPath = '../services/github',
    mock = process.env.SERVICE === 'mock' ? '.mock' : '',
    github = require(svcPath + mock);

module.exports = {
    getRepos () {
        return github.getRepos({
            org: github.config.org,
            per_page: 100
        });
    }
};
