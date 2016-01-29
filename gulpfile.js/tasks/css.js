var config = require('../config')

var gulp = require('gulp')
var browserSync = require('browser-sync')
var sourcemaps = require('gulp-sourcemaps')
var handleErrors = require('../lib/handleErrors')

var postcss = require('gulp-postcss')
var path = require('path')

var glob = require("glob")

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, 'application.css'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
}

var cssTask = function () {

  const processors = [
    require('postcss-import'),
    require('stylelint'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-color-function'),
    require('postcss-calc'),
    require('autoprefixer')({ browsers: ['last 3 version'] }),
  ]

  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .on('error', handleErrors)
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('css', cssTask)
module.exports = cssTask
