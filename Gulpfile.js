'use strict';
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    mocha = require('gulp-mocha'),
    nodemon = require('gulp-nodemon'),
    gutil = require('gulp-util'),

    /**
     * Build Constants
     */
    APP_SRC = 'app/**/*.js',
    ALL_SRC = [APP_SRC, '*.js'],
    SERVER_TEST_SRC = 'app/server/test/**/Test*.js',
    SERVER_IT_SRC = 'app/server/it/**/Test*.js',

    devServer = null;

/**
 * Static Analysis Tasks
 */
gulp.task('lint', () => {
    return gulp.src(ALL_SRC)
        .pipe(jshint({lookup: true}))
        .pipe(jshint.reporter('default'));
});

gulp.task('jscs', () => {
    return gulp.src(ALL_SRC)
        .pipe(jscs());
});

gulp.task('static-checks', [
    'lint',
    'jscs'
]);

/**
 * Testing Tasks
 */
gulp.task('server-test', () => {
    return gulp.src(SERVER_TEST_SRC)
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('exec-server-itest', ['start-server'], () => {
    return gulp.src(SERVER_IT_SRC)
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('server-itest', [
    'start-server',
    'exec-server-itest',
    'halt-server'
]);

/**
 * App-Server Startup (for test)
 */
gulp.task('start-server', () => {
    return new Promise((resolve, reject) => {
        devServer = nodemon({
            script: 'app.js',
            ext: 'js',
            watch: ['app/server/**/*.js'],
            env: {
                'NODE_ENV': 'development'
            },
            nodeArgs: ['--harmony'],
            stdout: false
        });

        devServer
        .on('exit', () => {
            gutil.log("Process exiting");
        })
        .on('change', ['static-checks'])
        .on('restart', () => {
            gutil.log('**** Server Restarted ****');
        })
        .on('stdout', (data) => {
            let output = data.toString();
            if (output.indexOf("Express server listening on port") !== -1) {
                gutil.log("**** Server Ready ****");
                resolve(devServer);
            }
        });
    });
});

gulp.task('halt-server', ['exec-server-itest'], () => {
    devServer.emit('quit');
});

gulp.task('default', [
    'static-checks',
    'server-test'
]);
