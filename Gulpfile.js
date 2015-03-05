'use strict';
var gulp         = require('gulp'),
    jshint       = require('gulp-jshint'),
    jscs         = require('gulp-jscs'),
    gutil        = require('gulp-util'),
    mocha        = require('gulp-mocha'),
    changed      = require('gulp-changed'),
    rimraf       = require('gulp-rimraf'),

    /**
     * Build Constants
     */
    APP_SRC = 'app/**/*.js',
    ALL_SRC = [APP_SRC, '*.js'],
    SERVER_TEST_SRC = 'app/server/test/**/Test*.js',
    SERVER_IT_SRC = 'app/server/it/**/Test*.js';

/**
 * Javascript Linting
 */
gulp.task('lint', function () {
    return gulp.src(ALL_SRC)
       .pipe(jshint({lookup: true}))
       .pipe(jshint.reporter('default'));
});

/**
 * Javascript Code Style Checking
 */
gulp.task('jscs', function () {
    return gulp.src(ALL_SRC)
        .pipe(jscs());
});

/**
 * Unit Testing
 */
gulp.task('server-test', function () {
    return gulp.src(SERVER_TEST_SRC)
        .pipe(mocha({reporter: 'spec'}));
});

/**
 * Integration Testing
 */
gulp.task('server-it', function () {
    return gulp.src(SERVER_IT_SRC)
        .pipe(mocha({reporter: 'spec'}));
});


gulp.task('default', [
    'lint',
    'jscs',
    'server-test'
]);
