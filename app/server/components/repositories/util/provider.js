'use strict';

var svcPath = '../../services/github',
    mock = process.env.SERVICE === 'mock' ? '.mock' : '',
    github = require(svcPath + mock);

module.exports = {

    github: github,

    getDefaultListArgs () {
        return {
            org: github.config.org,
            per_page: 100
        };
    },

    getDefaultItemArgs () {
        return {
            org: github.config.org
        };
    }

};
