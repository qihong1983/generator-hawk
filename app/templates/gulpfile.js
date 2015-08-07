var gulp          = require("gulp"),
    fileinclude   = require('gulp-file-include'),
    hawkjs        = require('gulp-hawkjs'),
    hawkcss       = require('gulp-hawkcss'),
    hawk_combo    = require('gulp-hawk-combo'),
    transport     = require("gulp-seajs-transport"),
    // utf8Convert   = require('gulp-utf8-convert'),
    // gulpSequence  = require('gulp-sequence'),
    htmlmin       = require('gulp-htmlmin'),
    seajsCombo    = require('gulp-seajs-combo'),
    // runSequence = require('gulp-run-sequence'),
    hawkRename  = require('gulp-hawk-rename');


//这个是本地开发目录
gulp.task('dev',['js','css'], function() {
	gulp.src(['./src/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build'))
    .pipe(hawkjs(true))
    .pipe(gulp.dest('./build'))
    .pipe(hawkcss())
    .pipe(gulp.dest('./build'))
    //.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'));

    hawk_combo.start();
});

//这个是测试环境
gulp.task('qa',['js','css'], function() {
  gulp.src(['./src/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build'))
    .pipe(hawkjs(true))
    .pipe(gulp.dest('./build'))
    .pipe(hawkcss())
    .pipe(gulp.dest('./build'))
    .pipe(hawkRename({"changeName":"statics.baidu.com:8000"}))
    .pipe(gulp.dest('./build'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'));

    hawk_combo.start();
});


//这个是测试环境
gulp.task('publish',['js','css'], function() {
  gulp.src(['./src/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build'))
    .pipe(hawkjs(true))
    .pipe(gulp.dest('./build'))
    .pipe(hawkcss())
    .pipe(gulp.dest('./build'))
    .pipe(hawkRename({"changeName":"img1sw.baidu.com"}))
    .pipe(gulp.dest('./build'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'));

    hawk_combo.start();
});


gulp.task('css', function() {
  return gulp.src('./src/**/*.css')
    .pipe(gulp.dest('./build'));

    // hawk_combo.start();
});


gulp.task('copy',function (){
  gulp.src('./src/**/*')
    .pipe(gulp.dest('./build'));
});

gulp.task("js",function(){
  return gulp.src(["./src/**/*.js"])
    .pipe(gulp.dest("./build"))
    .pipe(transport())
     // .pipe( seajsCombo({ignore : [ 'global', 'common' ,'config' ]}))

    .pipe(gulp.dest("./build"));

    console.log(1111111111111111);

 

     

   
});



gulp.task('default', ['js'], function() {
    gulp.start('include', 'css');
});


// gulp.task('dev', gulpSequence('js',['include']));
gulp.task('build',['js','include']);