var config = require('../config')
var gulp   = require('gulp')
var path   = require('path')
var watch  = require('gulp-watch')

var watchTask = function() {
  var watchableTasks = ['images', 'css']

  var glob = path.join(config.root.src, config.tasks.images.src, '**/*.{' + config.tasks.images.extensions.join(',') + '}')
  watch(glob, function() {
    require('./images')()
  })

  glob = path.join(config.root.src, config.tasks.css.src, '**/*.{' + config.tasks.css.extensions.join(',') + '}')
  watch(glob, function() {
    require('./css')()
  })

  watch('.stylelintrc.json', function() {
    require('./css')()
  })
}

gulp.task('watch', ['browserSync'], watchTask)
module.exports = watchTask
