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
    SERVER_TEST_SRC = 'app/server/test/**/Test*.js';

/**
 * Javascript Linting
 */
gulp.task('lint', () => {
    return gulp.src(ALL_SRC)
       .pipe(jshint({lookup: true}))
       .pipe(jshint.reporter('default'));
});

/**
 * Javascript Code Style Checking
 */
gulp.task('jscs', () => {
    return gulp.src(ALL_SRC)
        .pipe(jscs());
});

/**
 * Unit Testing
 */
gulp.task('server-mocha', () => {
    return gulp.src(SERVER_TEST_SRC)
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', [
    'lint',
    'jscs',
    'server-mocha'
]);
