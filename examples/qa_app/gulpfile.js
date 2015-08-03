var gulp = require('gulp');
// var connect = require('gulp-connect');
browserify = require('gulp-browserify');
//concat = require('gulp-concat');
var $ = require('gulp-load-plugins')();
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

//之前需要使用 liveload 改为使用 browserSync
//var reload = $.connect.reload;

var port = process.env.port || 6000;


// 打包 Common JS 模块
gulp.task('browserify', function(){
  gulp.src('./app/js/main.js')
  //这里不能使用 $.browserify
  .pipe(browserify({
    transform: 'reactify',
  }))
  .pipe(gulp.dest('./dist/js'))
  .pipe( $.if(browserSync.active, reload({stream:true}) ) );
})

//live reload
gulp.task('serve', function(){
  browserSync.init({
    notify: false,
    open: "external", //local 
    logPrefix: 'QA',
    server: {
      baseDir: "./",
    }
  })

  //检测改变，但下面那条没起效，暂时先用 $.if 
  gulp.watch('./app/js/**/*.js', ['browserify']);
  gulp.watch('./dist/**/*', reload() ); //这个无效，为什么
  //gulp.watch('./app/**/*.html', reload() );
  //gulp.watch("./index.html").on('change', reload() );
})


gulp.task('default', ['serve', 'browserify'])
