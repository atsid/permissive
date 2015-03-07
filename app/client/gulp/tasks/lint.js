'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');

module.exports = gulp.task('lint', function () {
  return gulp.src(config.paths.src.scripts)
  .pipe(jscs({
    configPath: '../../.jscsrc'
  }))
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});
