'use strict';

exports.start = function () {

    var express = require('express'),
        http = require('http'),
        app = express(),
        users = require('./server/routes/users'),
        repos = require('./server/routes/repos');

    app.set('port', 3000);

    app.get('/users', users.list);
    app.get('/users/:username', users.read);
    app.put('/users/:username/repos/:id/permissions/:permission', users.editRepoPermission);
    app.delete('/users/:username/repos/:id', users.removeRepoPermission);

    app.use(repos.create());

    app.use(express.static(__dirname + '/client/native'));

    http.createServer(app).listen(app.get('port'), function () {
        console.log('-----------------------------------------------------------------------');
        console.log('Express server listening on port ' + app.get('port'));
    });

};
