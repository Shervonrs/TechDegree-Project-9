const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync').create(),
      reload = browserSync.reload,
      sass = require('gulp-sass'),
      cleanCSS = require('gulp-clean-css'),
      sourcemaps =require('gulp-sourcemaps'),
      concat =require('gulp-concat'),
      imagemin = require('gulp-imagemin'),
      changed=require('gulp-changed'),
      uglify = require('gulp-uglify'),
      terser= require('gulp-terser'),
      lineEC =require('gulp-line-ending-corrector');

function css() {
  return gulp.src('./scss/**/*.scss')
  .pipe(sourcemaps.init({loadMaps:true}))
  .pipe(sass({
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(sourcemaps.write('./'))
  .pipe(lineEC())
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream());
}

function concatCSS(){
  return gulp.src('./css/styles.css')
  .pipe(sourcemaps.init({loadMaps: true, largeFile:true}))
  .pipe(concat('style.min.css'))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write('./'))
  .pipe(lineEC())
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream());
}

function javascript(){
  return gulp.src(['./js/app.js','./js/parallax.js' ])
  .pipe(concat('/main.js'))
  .pipe(terser())
  .pipe(lineEC())
  .pipe(gulp.dest('js'))
  .pipe(browserSync.stream());
}

function watch(){
  browserSync.init({
    server: {
      baseDir:'./'
    }
  });
  gulp.watch('./scss/**/*.scss', gulp.series([css, concatCSS]));
  gulp.watch('./js/app.js', javascript);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.css = css;
exports.concatCSS = concatCSS;
exports.javascript = javascript;
exports.watch = watch;


const build = gulp.parallel(watch);
gulp.task('default', build);
