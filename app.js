'use strict';

var cluster = require('cluster'),
    cpuCount = require('os').cpus().length,
    workerLimit = process.env.WORKER_LIMIT,
    clusteringEnabled = process.env.ENABLE_CLUSTERING,
    workerCount = workerLimit ? workerLimit : cpuCount,
    i,
    startApplication = function () {
        var permissive = require('./app/main');
        permissive.start();
    };

if (clusteringEnabled && cluster.isMaster) {
    console.log("Spawning " + workerCount + " workers");
    for (i = 0; i < workerCount; i += 1) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
        cluster.fork();
    });
} else {
    startApplication();
}
