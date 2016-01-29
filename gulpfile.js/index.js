var requireDir = require('require-dir')
var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')

// Require all tasks in gulpfile.js/tasks, including subfolders
requireDir('./tasks', { recurse: true })

gulp.task('default', gulpSequence('clean', 'images', [ 'html', 'css', 'webpack:watch' ], 'static', 'watch'))
gulp.task('production', gulpSequence('clean', 'images', [ 'html', 'css', 'webpack:production' ], 'rev', 'static'))


