'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('default', function () {
  if (release) {
    runSequence(
      'clean',
      ['index', 'styles', 'images', 'assets', 'templates', 'lint', 'test'],
      'browserify',
      ['minify']
    );
  } else {
    runSequence(
      'clean',
      ['index', 'styles', 'images', 'assets', 'templates', 'lint', 'test'],
      ['watchify', 'watch']
    );
  }
});
