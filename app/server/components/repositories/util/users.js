'use strict';

var svcPath = '../../services/github',
    mock = process.env.SERVICE === 'mock' ? '.mock' : '',
    github = require(svcPath + mock),
    convertGithubUser;

convertGithubUser = (user) => {
    return {
        username: user.login,
        name: user.name,
        avatar_url: user.avatar_url
    };
};

module.exports = {

    convertGithubUser: convertGithubUser,

    getGithubUser (username) {
        return github.getUser({
            'user': username
        }).then(user => convertGithubUser(user));
    },

    getGithubUsers() {
        return github.getUsers({
            org: github.config.org,
            per_page: 100
        });
    },

    isMember(username) {
        return github.isMember({
            org: github.config.org,
            username: username
        });
    }
};
