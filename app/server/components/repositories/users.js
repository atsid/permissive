'use strict';

var userUtil = require('./util/users'),
    Bluebird = require('bluebird');

module.exports = {

    getUsers () {
        return userUtil.getGithubUsers().then(users => {
            let profiles = users.map(user => userUtil.getGithubUser(user.username).then(profile => user.name = profile.name));
            return Bluebird.all(profiles).then(() => users);
        });
    }

};
