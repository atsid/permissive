'use strict';

var cluster = require('cluster'),
    debug = require('debug')('app:clustering'),
    clusteringEnabled = process.env.ENABLE_CLUSTERING,
    startMaster = () => {
        let workerLimit = process.env.WORKER_LIMIT,
            cpuCount = require('os').cpus().length,
            workerCount = workerLimit ? workerLimit : cpuCount;
        debug("Spawning " + workerCount + " workers");
        for (let i = 0; i < workerCount; i += 1) {
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            debug('worker %d died (%s). restarting...', worker.process.pid, signal || code);
            cluster.fork();
        });
    },
    startApplication = () => {
        let permissive = require('./server/main');
        permissive.start();
    };

if (clusteringEnabled && cluster.isMaster) {
    startMaster();
} else {
    startApplication();
}
