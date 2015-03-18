'use strict';

var gulp = require('gulp'),
    istanbul = require('gulp-istanbul'),
    isparta = require('isparta'),
    Bluebird = require('bluebird'),
    mocha = require('gulp-mocha');

//instrument all src
function instrumentSource() {
    return gulp.src(config.paths.src.scripts)
        .pipe(istanbul({
            instrumenter: isparta.Instrumenter,
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire());
}

module.exports = gulp.task('test', () => {
    return new Bluebird((resolve) => {
        instrumentSource()
            .on('finish', () => {
                gulp.src(config.paths.src.test)
                    .pipe(mocha())
                    .pipe(istanbul.writeReports({
                        reporters: ['lcov', 'text-summary']
                    }))
                    .on('end', resolve);
            });
    });
});
