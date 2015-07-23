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

    getGithubOwners() {
        var args = provider.getDefaultListArgs();
        args.role = 'admin';
        return provider.github.getUsers(args).then(users => {
            let profiles = users.map(user => this.getGithubUser(user.login).then(profile => {
                profile.owner = true;
                return profile;
            }));
            return Bluebird.all(profiles).then((users) => users);
        });
    },

    getGithubMembers() {
        var args = provider.getDefaultListArgs();
        args.role = 'member';
        return provider.github.getUsers(args).then(users => {
            let profiles = users.map(user => this.getGithubUser(user.login).then(profile => profile));
            return Bluebird.all(profiles).then((users) => users);
        });
    },

    isOrgMember(username) {
        return provider.github.isOrgMember({
            org: provider.github.config.org,
            user: username
        });
    }
};
