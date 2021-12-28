/*
* Gulp Builder (Watch)
* @version: 1.0.0 (Fri, 08 May 2020)
* @author: HtmlStream
* @license: Htmlstream (https://htmlstream.com/licenses)
* Copyright 2020 Htmlstream
*/

const fs                                        = require('fs');
const del                                       = require('del');

const {config, context, pathLevel, shieldingVariables, shieldingFunctions, gulpRGBA, gulpLighten, gulpDarken}              = require('./core');
const paths                                     = require('./paths')
const {svgCompiler}                             = require('./svg-compiler')

const gulp                                      = require('gulp');
const browsersync                               = require('browser-sync').create();
const fileinclude                               = require('gulp-file-include');
const cached                                    = require('gulp-cached')
const replace                                   = require('gulp-replace');
const sass                                      = require('gulp-sass')
const autoprefixer                              = require('gulp-autoprefixer');

var url = null;

function browserSync(done) {
  browsersync.init({
    files: "./*.html",
    startPath: config.startPath,
    server: {
      baseDir: [paths.src.tmp.dir, paths.src.base.dir, paths.root],
      middleware: function (req, res, next) {
        if (/\.json|\.txt|\.html/.test(req.url) && req.method.toUpperCase() == 'POST') {
          req.method = 'GET';
        }


        url = req.url;
        var index = 0;
        index = req.url.indexOf('?');

        if (index == -1){
          index = req.url.indexOf('#');
        }
        if (index != -1){
          url = req.url.substring(0, index);
        }

        var filename = __dirname.replace('gulpfiles', '') + paths.src.tmp.dir.replace('./', '') + url;
        if (url.split('.').pop() === 'html') {
          fileInclude(() => {
            if (fs.existsSync(filename)) {
              var html = fs.readFileSync(filename, 'utf8');
              res.end(html)
            } else {
              res.end('Oops, page not found.')
            }
          })
        } else {
          next();
        }
      }
    }
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function fileIncludeAll() {
  return gulp
    .src([
      paths.src.html.files,
      '!' + paths.src.assets.files,
      '!' + paths.src.tmp.files,
      '!' + paths.src.partials.files,
    ])
    .pipe(cached())
    .pipe(replace(/@@autopath/g, function (match) {
      return pathLevel(this.file)
    }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true,
      context: context
    }))
    .pipe(replace(/@@autopath/g, function (match) {
      return pathLevel(this.file)
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
    .pipe(replace(/(\[\@\@\]).*?/g, function (match, p1) {
      return shieldingVariables(match, p1);
    }))
    .pipe(replace(/(\[@\@F\]).*?/g, function (match, p1) {
      return shieldingFunctions(match, p1);
    }))
    .pipe(gulp.dest(paths.src.tmp.dir))
};

function fileInclude(callback = {}) {
  return Promise.all([
    new Promise(function (resolve, reject) {
      gulp
        .src([
          paths.src.html.dir + url.slice(0, 1) + '*' + url.slice(1),
          '!' + paths.src.assets.files,
          '!' + paths.src.tmp.files,
          '!' + paths.src.partials.files
        ])
        .pipe(replace(/@@autopath/g, function (match) {
          return pathLevel(this.file)
        }))
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file',
          indent: true,
          context: context
        }))
        .pipe(replace(/@@autopath/g, function (match) {
          return pathLevel(this.file)
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
        .pipe(replace(/(\[\@\@\]).*?/g, function (match, p1) {
          return shieldingVariables(match, p1);
        }))
        .pipe(replace(/(\[@\@F\]).*?/g, function (match, p1) {
          return shieldingFunctions(match, p1);
        }))
        .pipe(gulp.dest(paths.src.tmp.dir))
        .on('end', resolve)
    })
  ]).then(function () {
    callback()
  });
};

function scss() {
  return gulp
    .src(paths.src.scss.files)
    .pipe(sass({outputStyle: 'expanded', includePaths: [paths.node.dir]}))
    .pipe(gulp.dest(paths.src.css.dir))
    .on('error', sass.logError)
    .pipe(autoprefixer([
      "last 1 major version",
      ">= 1%",
      "Chrome >= 45",
      "Firefox >= 38",
      "Edge >= 12",
      "Explorer >= 10",
      "iOS >= 9",
      "Safari >= 9",
      "Android >= 4.4",
      "Opera >= 30"], {cascade: true}))
    .pipe(gulp.dest(paths.src.css.dir))
    .pipe(browsersync.stream());
}

function clean() {
  return del(paths.src.tmp.dir + '/**', {force: true});
}

function watch() {
  gulp.watch(paths.src.scss.files, scss);
  gulp.watch([paths.src.html.files, paths.src.partials.files], gulp.series(fileInclude, browserSyncReload));
}

gulp.task('default', gulp.series(clean, fileIncludeAll, svgCompiler, scss, browserSync, watch))
