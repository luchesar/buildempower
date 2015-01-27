var gulp = require('gulp');
var concat = require('gulp-concat');
var server = require('gulp-express');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var watch = require('gulp-watch');
var path = require('path');

var styleBase = 'static/assets/style/';
var paths = {
  scripts: {
    bootstrap: 'static/assets/js/bootstrap/source/*.js',
    jqueryPlugins: 'static/assets/js/plugins/source/*.js',
    application: 'static/assets/js/application/source/*.js'
  },
  images: 'static/assets/images/**/*',
  pages: ["index.html", "static/pages/**/*.html"],
  less: [
    styleBase + '/bootstrap.less'
  ]
};


gulp.task('server', function () {
    // Start the server at the beginning of the task
   var options = {
      file: 'server.js',
      port: 35728  
   };
   server.run(options);
   var restart = function(server) {
     server.stop();
     server.run(options);
     server.notify();
   }
//   gulp.watch(['index.html'], restart(server));
//   gulp.watch(paths.pages, restart(server));
//   gulp.watch(paths.images, restart(server));
});

gulp.task('less', function () {
  gulp.src(paths.less)
    .pipe(less()).on('error', util.log)
    .pipe(minifyCss())
    .pipe(gulp.dest('static/assets/style'));
});

gulp.task('compress-bootstrap', function() {
  gulp.src(paths.scripts.bootstrap)
    .pipe(concat('bootstrap.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static/assets/js/bootstrap/'))
});

gulp.task('compress-plugins', function() {
  gulp.src(paths.scripts.jqueryPlugins)
    .pipe(concat('jquery-plugins.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static/assets/js/plugins/'))
});

gulp.task('compress-application', function() {
  gulp.src(paths.scripts.application)
    .pipe(concat('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static/assets/js/application/'))
});

gulp.task('compress', ['compress-bootstrap', 'compress-plugins', 'compress-application']);

gulp.task('build', ['less', 'compress']);

gulp.task('default', ['server']);
