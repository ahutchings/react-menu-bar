var gulp       = require('gulp');
var gutil      = require('gulp-util');
var source     = require('vinyl-source-stream');
var watchify   = require('watchify');
var browserify = require('browserify');
var sync       = require('browser-sync');
var extend     = require('extend')

gulp.task('sync', ['scripts'], function () {
  sync.init(null, {
    port: process.env.PORT || 3000,
    server: {
      baseDir: './example'
    }
  });
});

gulp.task('scripts', function () {
  var options = extend({}, watchify.args, {debug: true});
  var bundler = watchify(browserify('./example/index.jsx', options));

  bundler.transform('reactify');

  bundler.on('update', rebundle);

  function rebundle () {
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('index.js'))
      .pipe(gulp.dest('./example'))
      .pipe(sync.reload({stream: true, once: true}));
  }

  return rebundle();
});

gulp.task('default', ['sync']);
