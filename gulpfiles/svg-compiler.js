/*
* SVG Compiler (Build)
* @version: 1.0.0 (Fri, 08 May 2020)
* @author: HtmlStream
* @license: Htmlstream (https://htmlstream.com/licenses)
* Copyright 2020 Htmlstream
*/

const {config, context, additionNames, gulpDarken, gulpLighten, gulpRGBA}                                 = require('./core');
const paths                                                            = require('./paths');

const gulp                                                             = require('gulp');
const fileinclude                                                      = require('gulp-file-include');
const replace                                                          = require('gulp-replace');

module.exports.svgCompiler = function() {
  return gulp
    .src([
      paths.src.svg.files
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: context
    }))
    .pipe(replace(/gulpLighten\[(.*?)\]/g, function (math, p1) {
      return gulpLighten(p1)
    }))
    .pipe(replace(/gulpDarken\[(.*?)\]/g, function (math, p1) {
      return gulpDarken(p1)
    }))
    .pipe(replace(/gulpRGBA\[(.*?)\]/g, function (math, p1) {
      return gulpRGBA(p1)
    }))
    .pipe(gulp.dest(config.directoryNames.src + "/" + additionNames.svg))
};
