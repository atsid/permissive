'use strict';

var provider = require('./provider'),
    debug = require('debug')('app:repositories:user'),
    convertGithubUser;

convertGithubUser = (user) => {
    return {
        username: user.login,
        name: user.name,
        avatar_url: user.avatar_url
    };
};

module.exports = {

    getGithubUser (username) {
        var args = provider.getDefaultItemArgs();
        args.user = username;
        return provider.github.getUser(args).then(user => convertGithubUser(user));
    },

    getGithubUsers() {
        var args = provider.getDefaultListArgs();
        return provider.github.getUsers(args).then(users => users.map(user => convertGithubUser(user)));
    },

    isOrgMember(username) {
        return provider.github.isOrgMember({
            org: provider.github.config.org,
            user: username
        });
    }
};
