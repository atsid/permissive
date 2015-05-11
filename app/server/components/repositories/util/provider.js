'use strict';

var conf = require('../../../config'),
    svcPath = '../../services/github',
    mock = conf.get('service') === 'mock' ? '.mock' : '',
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
