'use strict';

var cluster = require('cluster'),
    workerLimit = process.env['WORKER_LIMIT'],
    clusteringEnabled = process.env['ENABLE_CLUSTERING'],
    startApplication = function () {
        var permissive = require('./app/main');
        permissive.start();
    };

if (clusteringEnabled && cluster.isMaster) {
    var cpuCount = require('os').cpus().length,
        workerCount = workerLimit ? workerLimit : cpuCount;

    console.log("Spawning " + workerCount + " workers");
    for (var i = 0; i < workerCount; i += 1) {
        console.log("spawning worker");
        cluster.fork();
    }
    cluster.on('disconnect', function (worker) {
        console.error('**worker disconnected**', worker);
        cluster.fork();
    });
} else {
    startApplication();
}


