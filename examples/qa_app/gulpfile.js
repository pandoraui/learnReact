var gulp = require('gulp');
// var connect = require('gulp-connect');
browserify = require('gulp-browserify');
//concat = require('gulp-concat');
var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

//教程使用的插件 liveload 我使用的 browserSync
//另外 gulp-* 之类的插件，改为使用 gulp-load-plugins 使用 $.if 之类来调用
//var reload = $.connect.reload;

var port = process.env.port || 5000;

/* 这里有些组件，干什么的，再熟悉下
"gulp": "*",                  // 基础
"gulp-if": "*",               // 根据不同的环境，切换方法

"gulp-util": "*",             // 如果有自定义方法，可能会用到
"gulp-clean": "*",            // 清理路径下文件
"gulp-rename": "*",           // 重命名文件，比如上节提到 _ 需要还原回去
"gulp-concat": "*",           // 文件合并

"gulp-jshint": "*",           // jshint 检查一些格式，这个是为了统一团队的代码风格的
"gulp-browserify": "*",       // 利用 CommonJS 的格式，直接让浏览器也能用类似的方式
"gulp-uglify": "*",           // 替换压缩

"gulp-jade": "*",             // jade
"gulp-stylus": "*",           // stylus

"gulp-mocha": "*",            // 测试框架
"chai": "*",
"jscov": "*",

"gulp-changed": "*"           // 有变化的才操作，没变化的就跳过，可进一步优化效率
*/ 

// 打包 Common JS 模块
gulp.task('browserify', function(){
  gulp.src('./app/js/main.js')
  
  //这里不能使用 $.browserify
  //实质是 using vinyl-source-stream: 
  .pipe(browserify({
    transform: 'reactify',
  }))
  .pipe($.sourcemaps.init())
  //.pipe(source('main.js'))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest('./dist/js'))
  //$.if(bool, trueFn, falseFn)
  .pipe( $.if(browserSync.active, reload({stream:true}) ) );
})

//live reload
gulp.task('serve', function(){
  browserSync.init({
    // port: 5000, //默认3000
    // ui: {    //更改默认端口weinre 3001
    //     port: 5001,
    //     weinre: {
    //         port: 9090
    //     }
    // },
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
