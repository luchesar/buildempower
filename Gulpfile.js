var gulp = require('gulp');
var concat = require('gulp-concat');
var server = require('gulp-express');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var util = require('gulp-util');
var watch = require('gulp-watch');
var path = require('path');

var styleBase = 'static/assets/style/';
var paths = {
  scripts: [
    'static/assets/js/bootstrap/source/*.js',
    'tatic/assets/js/plugins/source/*.js',
    'static/assets/js/application/source/*.js'
  ],
  images: 'static/assets/images/**/*',
  pages: ["index.html", "static/pages/**/*.html"],
  less: [
    styleBase + '/bootstrap.less'
  ]
};


gulp.task('server', function () {
    // Start the server at the beginning of the task
    server.run({
        file: 'server.js'
    });
   watch(['index.html'], server.notify);
   watch(paths.pages, server.notify);
   watch(paths.images, server.notify);
   watch(paths.scripts, server.notify);
});

gulp.task('less', function () {
  gulp.src(paths.less)
    .pipe(less()).on('error', util.log)
    .pipe(minifyCss())
    .pipe(gulp.dest('static/assets/style'));
});
//  less = require('gulp-less'),
//  browserify = require('gulp-browserify'),
//  concat = require('gulp-concat'),
//  embedlr = require('gulp-embedlr'),
//  refresh = require('gulp-livereload'),
 // lrserver = require('tiny-lr')(),
 // express = require('express'),
 // livereload = require('connect-livereload')
 // livereloadport = 35729,
 // serverport = 5000;




