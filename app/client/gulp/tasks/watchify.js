'use strict';

var gulp = require('gulp');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var browserifyShim = require('browserify-shim');
var babelify = require('babelify');

module.exports = gulp.task('watchify', function () {
  var bundler = watchify({
    entries: [config.paths.src.modules]
  });

  bundler
    .transform(browserifyShim)
    .transform(babelify.configure({
      ignore: "bower_components"
    }))

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler
      .bundle({ debug: true })
      .pipe(source(config.filenames.build.scripts))
      .pipe(gulp.dest(config.paths.dest.build.scripts));
  }

  return rebundle();
});
