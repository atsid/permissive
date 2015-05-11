'use strict';

var cluster = require('cluster'),
    debug = require('debug')('app:clustering'),
    conf = require('./server/config'),
    clusteringEnabled = conf.get('server.enableClustering'),
    startMaster = () => {
        let workerLimit = conf.get('server.workerLimit');
        debug("Spawning " + workerLimit + " workers");
        for (let i = 0; i < workerLimit; i += 1) {
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
