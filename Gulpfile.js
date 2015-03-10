'use strict';
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    mocha = require('gulp-mocha'),
    nodemon = require('gulp-nodemon'),
    gutil = require('gulp-util'),
    babel = require('gulp-babel'),
    changed = require('gulp-changed'),
    runSequence = require('run-sequence'),
    rimraf = require('gulp-rimraf'),
    Bluebird = require('bluebird'),
    jade = require('gulp-jade'),
    sourcemaps = require('gulp-sourcemaps'),
    istanbul = require('gulp-istanbul'),
    coveralls = require('gulp-coveralls'),

    /**
     * Build Constants
     */
    APP_SRC = ['app/**/*.js', 'app/*.js', '!app/client/**'],
    APP_DIST = 'dist/',
    SERVER_DIST = 'dist/server/**/*.js',
    ALL_SRC = APP_SRC.concat(['*.js']),
    SERVER_TEST_SRC = 'dist/server/test/**/Test*.js',
    SERVER_IT_SRC = 'dist/server/it/**/Test*.js',

    devServer = null;

/**
 * Transpilation
 */
gulp.task('transpile', function () {
    return gulp.src(APP_SRC)
        .pipe(changed(APP_DIST))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(APP_DIST));
});

gulp.task('clean', function () {
    return gulp.src(APP_DIST)
        .pipe(rimraf());
});

/**
 * Static Analysis Tasks
 */
gulp.task('lint', function () {
    return gulp.src(ALL_SRC)
        .pipe(jshint({lookup: true}))
        .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function () {
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
function instrumentSource() {
    return gulp.src(SERVER_DIST)
        .pipe(istanbul({
            reporters: ['lcov', 'text-summary']
        }))
        .pipe(istanbul.hookRequire());
}
gulp.task('test', function () {
    return new Bluebird(function (resolve, reject) {
        instrumentSource()
            .on('finish', function () {
                gulp.src(SERVER_TEST_SRC)
                    .pipe(mocha())
                    .pipe(istanbul.writeReports())
                    .on('end', resolve);
            });
    });
});

gulp.task('exec-itest', ['start-server'], function () {
    return new Bluebird(function (resolve, reject) {
        instrumentSource()
            .on('finish', function () {
                gulp.src(SERVER_IT_SRC)
                    .pipe(mocha())
                    .pipe(istanbul.writeReports())
                    .on('end', resolve);
            });
    });
});

gulp.task('itest', [
    'start-server',
    'exec-itest',
    'halt-server'
]);

gulp.task('report-coverage', function () {
    return gulp.src('coverage/**/lcov.info')
        .pipe(coveralls());
});

/**
 * App-Server Startup (for test)
 */
gulp.task('start-server', function () {
    return new Bluebird(function (resolve, reject) {
        devServer = nodemon({
            script: 'dist/app.js',
            ext: 'js',
            watch: ['app/server/**/*.js', 'app/*.js'],
            env: {
                'NODE_ENV': 'development'
            },
            stdout: false,
            stderr: true
        });

        devServer
        .on('exit', function () {
            gutil.log("Process exiting");
            reject();
        })
        .on('change', ['static-checks', 'transpile'])
        .on('restart', function () {
            gutil.log('**** Server Restarted ****');
        })
        .on('stdout', function (data) {
            var output = data.toString();
            gutil.log(output);
            if (output.indexOf("Express server listening on port") !== -1) {
                gutil.log("**** Server Ready ****");
                resolve(devServer);
            }
        });
    });
});

gulp.task('halt-server', ['exec-itest'], function () {
    devServer.emit('quit');
});

gulp.task('default', function (cb) {
    runSequence(
        ['transpile', 'static-checks'],
        'test',
        'report-coverage',
        cb);
});
