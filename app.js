'use strict';

var cluster = require('cluster'),
    clusteringEnabled = process.env.ENABLE_CLUSTERING,
    startMaster = () => {
        let workerLimit = process.env.WORKER_LIMIT,
            cpuCount = require('os').cpus().length,
            workerCount = workerLimit ? workerLimit : cpuCount;
        console.log("Spawning " + workerCount + " workers");
        for (let i = 0; i < workerCount; i += 1) {
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
            cluster.fork();
        });
    },
    startApplication = () => {
        let permissive = require('./app/main');
        permissive.start();
    };

if (clusteringEnabled && cluster.isMaster) {
    startMaster();
} else {
    startApplication();
}
