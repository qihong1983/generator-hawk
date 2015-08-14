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
    hawkRename  = require('gulp-hawk-rename'),
    uglify =      require('gulp-uglify'),
    minifyCss   = require('gulp-minify-css');
var fs = require('fs');
var chalk = require('chalk');


var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
var hawksprite = require('gulp-hawksprite');



var base64 = require('gulp-base64');

gulp.task('sprite64',['hawksprite'], function () {
    return gulp.src('./build/common/icon/sprite.css')
        .pipe(base64({ 
            baseDir: './build',          
            maxImageSize: 32*1024, // bytes,
            deleteAfterEncoding: true,
            debug: true
        }))
        .pipe(gulp.dest('./build/common/icon'));
});

gulp.task('hawksprite',['sprite'], function () {
  return gulp.src('./build/common/icon/sprite.css')
    .pipe(hawksprite())
    .pipe(gulp.dest('./build/common/icon/'));
});

gulp.task('sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src('./src/common/icon/*.png')
      .pipe(spritesmith({
        'algorithm': 'binary-tree',
        imgName: './build/common/icon/sprite.png',
        cssName: './build/common/icon/sprite.css'
      }));

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./'));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    //.pipe(csso())
    .pipe(gulp.dest('./'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

var abc=JSON.parse(fs.readFileSync('./abc.json','utf-8'));
var mock_online_address = abc.mock_online_address;
var local_host = abc.local_host;
var local_port = abc.local_port;
var online_host = abc.online_host;

// gulp.task('compress', function() {
//   gulp.src('lib/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('dist'))
// });


//这个是本地开发目录
gulp.task('include',['js','css'], function() {
	return gulp.src(['./src/**/*.html'])
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

    
});

//这个是测试环境
gulp.task('qa',['js','css'], function() {
  gulp.src(['./src/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(hawkjs(true))
    .pipe(hawkcss())
    .pipe(hawkRename({"changeName":abc.qa_host+':'+abc.qa_port}))
    //.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'));
   
    //hawk_combo.start();
});


//这个是测试环境
gulp.task('publish',['jsmin','cssmin'], function() {
  gulp.src(['./src/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
   // .pipe(gulp.dest('./build'))
    .pipe(hawkjs(true))
    //.pipe(gulp.dest('./build'))
    .pipe(hawkcss())
    //.pipe(gulp.dest('./build'))
    .pipe(hawkRename({"changeName":abc.online_host}))
    //.pipe(gulp.dest('./build'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'));

    //hawk_combo.start();

});


gulp.task('css', function() {
  return gulp.src('./src/**/*.css')
    .pipe(gulp.dest('./build'));

});

gulp.task('cssmin', function() {
  return gulp.src('./src/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./build'));

});

gulp.task('copy',function (){
  gulp.src('./src/**/*')
    .pipe(gulp.dest('./build'));
});

gulp.task("js",function(){
  return gulp.src(["./src/**/*.js"])
    .pipe(transport())
    .pipe(gulp.dest("./build"));
});

//压缩版js
gulp.task("jsmin",function(){
  return gulp.src(["./src/**/*.js"])
    .pipe(transport())
    .pipe(uglify())
    .pipe(gulp.dest("./build"));
});

gulp.task("dev",["include",'css','hawksprite'], function () {


/**
 * 服务器开启提示
 */

 console.log('\n');
 var mock_online_address_temp = mock_online_address.substr(1,mock_online_address.length);
 console.log(

    chalk.blue("服务器开始运行 ")+chalk.cyan('复制根目录地址访问：')+chalk.bgRed("http://"+local_host+":"+local_port+mock_online_address)+'\n'+  
    chalk.blue('combo功能示例^_^：') + chalk.bgRed("http://"+local_host+":"+local_port + '/'+ mock_online_address_temp+'??' + 'pages/page1/page1.js,'+'pages/page2/page2.js')+'\n'+
    chalk.blue('关闭按：')+chalk.green('ctrl+c\n')+
    chalk.blue('配置文件在根目录：')+chalk.green('abc.json')+'\n'+
    chalk.blue('abc.json配置文件：\n')+chalk.green(JSON.stringify({
        "mock_online_address":mock_online_address ,
        "online_host": online_host,
        "online_port": 80,
        "local_host": local_host,
        "local_port": local_port,
        "qa_host": abc.qa_host,
        "qa_port": abc.qa_port
    }, null, 4))+'\n'
 );

    gulp.src(["./build/**/*.js"])
       // .pipe(uglify())
        .pipe(gulp.dest("./build"));

        hawk_combo.start();
});




gulp.task("dev1",["include",'css','sprite64'], function () {


/**
 * 服务器开启提示
 */

 console.log('\n');
 var mock_online_address_temp = mock_online_address.substr(1,mock_online_address.length);
 console.log(

    chalk.blue("服务器开始运行 ")+chalk.cyan('复制根目录地址访问：')+chalk.bgRed("http://"+local_host+":"+local_port+mock_online_address)+'\n'+  
    chalk.blue('combo功能示例^_^：') + chalk.bgRed("http://"+local_host+":"+local_port + '/'+ mock_online_address_temp+'??' + 'pages/page1/page1.js,'+'pages/page2/page2.js')+'\n'+
    chalk.blue('关闭按：')+chalk.green('ctrl+c\n')+
    chalk.blue('配置文件在根目录：')+chalk.green('abc.json')+'\n'+
    chalk.blue('abc.json配置文件：\n')+chalk.green(JSON.stringify({
        "mock_online_address":mock_online_address ,
        "online_host": online_host,
        "online_port": 80,
        "local_host": local_host,
        "local_port": local_port,
        "qa_host": abc.qa_host,
        "qa_port": abc.qa_port
    }, null, 4))+'\n'
 );

    gulp.src(["./build/**/*.js"])
       // .pipe(uglify())
        .pipe(gulp.dest("./build"));

        hawk_combo.start();
});






gulp.task('default', ['js'], function() {
    gulp.start('include', 'css');
});


// gulp.task('dev', gulpSequence('js',['include']));
gulp.task('build',['js','include']);