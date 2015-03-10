'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var es = require('event-stream');

module.exports = gulp.task('styles', function () {
  return es.merge(
        gulp.src(config.paths.src.bowerStyles),
        gulp.src(config.paths.src.styles)
            .pipe(gulpif(!release, sourcemaps.init()))
            .pipe(sass())
            .pipe(gulpif(!release, sourcemaps.write()))
        )
    .pipe(concat('app.css'))
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulpif(release, csso()))
    .pipe(gulpif(release, rename(config.filenames.release.styles), rename(config.filenames.build.styles)))
    .pipe(gulpif(release, gulp.dest(config.paths.dest.release.styles), gulp.dest(config.paths.dest.build.styles)));
});
