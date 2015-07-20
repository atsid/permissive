'use strict';

var provider = require('./provider'),
    Bluebird = require('bluebird'),
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

    getGithubProfiles() {
        return this.getGithubUsers().then(users => {
            let profiles = users.map(user => this.getGithubUser(user.username).then(profile => user.name = profile.name));
            return Bluebird.all(profiles).then(() => users);
        });
    },

    isOrgMember(username) {
        return provider.github.isOrgMember({
            org: provider.github.config.org,
            user: username
        });
    }
};
