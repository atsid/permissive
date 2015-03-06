'use strict';

var users = [{
    login: 'testuser1',
    name: 'Test User 1'
}, {
    login: 'testuser2'
}];

module.exports = {
    getUsers () {
        console.log('looking up mock users');
        return new Promise((resolve, reject) => {
            resolve(users);
        });
    },

    getUser (username) {
        console.log('looking up mock user [' + username + ']');
        return new Promise((resolve, reject) => {
            let user = users.find((item) => item.login === username);
            if (user) {
                resolve(user);
            } else {
                reject(new Error('No mock user: ' + username));
            }
        });
    }
};
