var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babel = require('babelify');

gulp.task('default', function() {
    var bundle = browserify('./front-end/app.js')
        .transform(babel, { presets: ['react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/assets'));
});