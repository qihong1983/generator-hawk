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
var md5 = require("gulp-md5-plus");
var clean = require('gulp-clean');
var notify = require('gulp-notify')



var base64 = require('gulp-base64');
var prompt = require('gulp-prompt');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
//var ftp = require("gulp-iftp");   //这个是普通ftp
var ftp = require("gulp-sftp");
var livereload = require('gulp-livereload');
//var ftp = require('gulp-ftp');
//一键上传


gulp.task('copyhtml64',function () {
  return gulp.src(['./build/**/*.html','!./build/**/demo.html'])
    .pipe(gulp.dest('./views'));
  });

gulp.task('copyhtml', function () {
  return gulp.src(['./build/**/*.html','!./build/**/demo.html','!./build/mods/**/*.html'])
    .pipe(gulp.dest('./views'));
  });

gulp.task('cleanhtml64',['copyhtml64'],function () {
  return gulp.src('./build/**/*.html')
    .pipe(clean({force: true}));
});
gulp.task('cleanhtml',function () {
  return gulp.src('./build/**/*.html')
    .pipe(clean({force: true}));
});

var abc=JSON.parse(fs.readFileSync('./abc.json','utf-8'));
var mock_online_address = abc.mock_online_address;
var local_host = abc.local_host;
var local_port = abc.local_port;
var online_host = abc.online_host;

var onlineftp=fs.existsSync('/ftpinfo.json');


var onlineftpcon = {};


if (onlineftp) {

//  console.log(fs.readFileSync('/ftpinfo.json', 'utf-8'));

var tmp = fs.readFileSync('/ftpinfo.json','utf-8');
  onlineftpcon = JSON.parse(tmp);




  
  onlineftp = false;
} else {
  onlineftp = true;
}



var qaftp=fs.existsSync('/ftpqainfo.json');


var qaftpcon = {};
if (qaftp) {

//  console.log(fs.readFileSync('/ftpinfo.json', 'utf-8'));

var tmpqa = fs.readFileSync('/ftpqainfo.json','utf-8');
  qaftpcon = JSON.parse(tmpqa);
  
  qaftp = false;
} else {
  qaftp = true;
}



// gulp.task('publish64', ['onlineif'], function () {
//      return gulp.src(["./build/config.js",'!./build/**/*.html'])
//         .pipe(ftp({
//           host:onlineftpcon.host,
//           port:onlineftpcon.port,
//           user:onlineftpcon.user,
//           pass:onlineftpcon.passwd,
//           logger:'files.txt',
//           froot:"/",
//           remote:"/var/www/html/a/group/project/0.1.0"
//         }))
// });

gulp.task('publishqa', ['onlineifqa'], function () {
   // gulp.start('cleanhtml');
    //gulp-iftp 写法
     // return gulp.src(["./build/config.js",'!./build/**/*.html'])
     //    .pipe(ftp({
     //      host:qaftpcon.host,
     //      port:qaftpcon.port,
     //      user:qaftpcon.user,
     //      pass:qaftpcon.passwd,
     //      logger:'files.txt',
     //      froot:"@.@",
     //      remote:abc.ftp_qa_root + abc.mock_online_address
     //    }))

     //gulp-sftp写法
     return gulp.src(["./build/**/*",'./build/**/*.html'])
        .pipe(ftp({
          host:qaftpcon.host,
          port:qaftpcon.port,
          user:qaftpcon.user,
          pass:qaftpcon.passwd,
          remotePath:abc.ftp_qa_root + abc.mock_online_address
        }))

});

gulp.task('msg',function () {
  return gulp.src('./build')
    .pipe(notify({ message : chalk.bgRed(chalk.white('把本地hosts-->'+abc.local_host+'注释掉或删掉>>访问==>http://'+abc.local_host+abc.mock_online_address+'页面名称/页面名称.js|.css'))}));
});

gulp.task('msgqa',function () {
  return gulp.src('./build')
    .pipe(notify({ message : chalk.bgRed(chalk.white('把把本地hosts-->'+abc.qa_host+'指向测试环境的IP>>访问==>http://'+abc.qa_host+abc.mock_online_address+'页面名称/页面名称.js|.css'))}));
});

gulp.task('importantqa',function () {
  return gulp.src('./build')
    .pipe(prompt.prompt([{
      type: 'input',
      name: 'importantqa',
      message: chalk.bgRed('第一次一定要按照这个路径"' + abc.ftp_qa_root + abc.mock_online_address + '"手动创建ftp目录?'),
      default:'Y/n'
    }],function (res) {
      var ifa = (/^y/i).test(res.importantqa);
      if (ifa) {
       // console.log('\n'+chalk.bgRed(abc.ftp_qa_root + abc.mock_online_address) +'\n');
      } else {
        qaftp = false;
        return ;
      }
    }));
});

gulp.task('important',function () {
  return gulp.src('./build')
    .pipe(prompt.prompt([{
      type: 'input',
      name: 'important',
      message: chalk.bgRed('第一次一定要按照这个路径"'+abc.ftp_online_root + abc.mock_online_address+'"手动创建ftp目录?'),
      default:'Y/n'
    }],function (res) {
      var ifa = (/^y/i).test(res.important);
      if (ifa) {
       // console.log('\n'+chalk.bgRed(abc.ftp_online_root + abc.mock_online_address) +'\n\n\n');
        
      } else {
        onlineftp = false;
        return ;
      }

     
    }));
});

gulp.task('onlineifqa', function() {
  return gulp.src('./build')
    .pipe(gulpif(qaftp, prompt.prompt([{
      type: 'input',
      name: 'initFtpAddress',
      message: '首次一定要按照这个路径"'+abc.ftp_qa_root + abc.mock_online_address+'"手动创建ftp目录?',
      default:'Y/n'
  },{
      type: 'input',
      name: 'host',
      message: '主机?'
  },{
      type: 'input',
      name: 'port',
      message: '端口?'
  },{
      type: 'input',
      name: 'user',
      message: '用户名?'
  },{
      type: 'password',
      name: 'passwd',
      message: '密码?'
  }], function(res){
      //value is in res.task (the name option gives the key)
      var ifa = (/^y/i).test(res.initFtpAddress);
      if (ifa) {
         qaftpcon = res; 
         fs.writeFileSync('/ftpqainfo.json', JSON.stringify(res), 'utf-8');
   
      } else {
          return ;
      }

       
      
  })))
    //.pipe(gulp.dest('./dist/'));
});

//console.log(abc.online_host);
//"mock_online_address": "/a/group/project/0.1.0/",
 // remote:abc.ftp_online_root + abc.mock_online_address,
gulp.task('publish', ['onlineif'], function () {
   // gulp.start('cleanhtml');

     // return gulp.src(["./build/config.js",'!./build/**/*.html'])
     //    .pipe(ftp({
     //      host:onlineftpcon.host,
     //      port:onlineftpcon.port,
     //      user:onlineftpcon.user,
     //      pass:onlineftpcon.passwd,
     //      logger:'files.txt',
     //      froot:"@.@",
     //      remote:abc.ftp_online_root + abc.mock_online_address
     //    }))

    console.log(onlineftpcon);
     return gulp.src(["./build/**/*",'!./build/**/*.html'])
        .pipe(ftp({
          host:onlineftpcon.host,
          port:onlineftpcon.port,
          user:onlineftpcon.user,
          pass:onlineftpcon.passwd,
          remotePath:abc.ftp_online_root + abc.mock_online_address
        }))


});

//console.log(ftp);



//global.ftp.save = true; // TODO: add business logic

gulp.task('onlineif', function() {
  return gulp.src('./build')
    .pipe(gulpif(onlineftp, prompt.prompt([{
      type: 'input',
      name: 'initFtpAddress',
      message: '首次一定要按照这个路径"'+abc.ftp_online_root + abc.mock_online_address+'"手动创建ftp目录?',
      default:'Y/n'
  },{
      type: 'input',
      name: 'host',
      message: '主机?'
  },{
      type: 'input',
      name: 'port',
      message: '端口?'
  },{
      type: 'input',
      name: 'user',
      message: '用户名?'
  },{
      type: 'password',
      name: 'passwd',
       message: '密码?'
  }], function(res){
      //value is in res.task (the name option gives the key)
      var ifa = (/^y/i).test(res.initFtpAddress);

      if (ifa) {
         onlineftpcon = res; 
         fs.writeFileSync('/ftpinfo.json', JSON.stringify(res), 'utf-8');
   
      } else {
        onlineftp = false;
          return ;
      }

       
      
  })))
    //.pipe(gulp.dest('./dist/'));
});

//qa
gulp.task('prompt' ,function() {
  gulp.src('./build/pages/page1/page1.js')
  .pipe(prompt.prompt([{
      type: 'input',
      name: 'host',
      message: '主机?'
  },{
      type: 'input',
      name: 'port',
      message: '端口?'
  },{
      type: 'input',
      name: 'user',
      message: '用户名?'
  },{
      type: 'password',
      name: 'passwd',
      message: '密码?'
  },{
      type: 'boolean',
      name: 'save',
      message: '保存吗?'
  }], function(res){
      //value is in res.task (the name option gives the key)
      // console.log(res);
      if (res.save == true) {
        //var ftp=JSON.parse(fs.readFileSync('/ftpinfo.json','utf-8'));

        fs.writeFileSync('/ftpinfo.json', res, 'utf-8');
      }
      global.ftp = res;
  }));
});



//加入md5
gulp.task('cssmd5' , function() {
    var imgSrc = './build/**/*.css',
        quoteSrc = './build/**/*.html', // [./output/static/css/**/*.css',./output/static/js/**/*.js']
        imgDst = './build';

    return gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(md5(10 ,quoteSrc))
        .pipe(gulp.dest(imgDst));
});

gulp.task('jsmd5' ,function() {
    var imgSrc = './build/**/*.js',
        quoteSrc = './build/**/*.html', // [./output/static/css/**/*.css',./output/static/js/**/*.js']
        imgDst = './build';

    return gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(md5(10 ,quoteSrc))
        .pipe(gulp.dest(imgDst));
});

gulp.task('modsjsmd5' ,function() {
    var imgSrc = './build/**/*.js',
        quoteSrc = './build/**/*.js', // [./output/static/css/**/*.css',./output/static/js/**/*.js']
        imgDst = './build';

    return gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(md5(10 ,quoteSrc))
        .pipe(gulp.dest(imgDst));
});

gulp.task('imgmd5' ,function() {
    var imgSrc = './build/**/*.png',
        quoteSrc = './build/**/*.css', // [./output/static/css/**/*.css',./output/static/js/**/*.js']
        imgDst = './build';

    return gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(md5(10 ,quoteSrc))
        .pipe(gulp.dest(imgDst));
});


//清理
gulp.task('clean', function () {
    return gulp.src('./build')
        .pipe(clean({force: true}))
        .pipe(gulp.dest('./'));
});

//合成sprite图片
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

gulp.task('onlineSprite64', function () {
    return gulp.src('./build/common/icon/sprite.css')
        .pipe(base64({ 
            baseDir: './build',          
            maxImageSize: 32*1024, // bytes,
            deleteAfterEncoding: true,
            debug: true
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('./build/common/icon'));
});

//css压缩



gulp.task('hawksprite',['sprite'], function () {
  return gulp.src('./build/common/icon/sprite.css')
    .pipe(hawksprite())
    .pipe(gulp.dest('./build/common/icon/'));
});

gulp.task('onlineHawksprite',['sprite'], function () {
  return gulp.src('./build/common/icon/sprite.css')
    .pipe(hawksprite())
    .pipe(minifyCss())
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



// gulp.task('compress', function() {
//   gulp.src('lib/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('dist'))
// });



//调试

gulp.task('includeHtml', function () {
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



gulp.task('include1',['js','css'], function() {
  return gulp.src(['./src/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build'))
    .pipe(hawkjs(true))
    .pipe(gulp.dest('./build'))
    .pipe(hawkcss())
    .pipe(hawkRename({"changeName":abc.online_host}))
    .pipe(gulp.dest('./build'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'));

    
});

//这个是测试环境
gulp.task('qainclude',['js','css'], function() {
  gulp.src(['./src/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(hawkjs(true))
    .pipe(hawkcss())
    .pipe(hawkRename({"changeName":abc.qa_host}))
    //.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'));
   
    //hawk_combo.start();
});


//这个是测试环境
gulp.task('publishinclude64',['jsmin','cssmin','onlineSprite64'], function() {
  return gulp.src(['./src/**/*.html'])
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


gulp.task('publishinclude', function() {
  return gulp.src(['./src/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
   // .pipe(gulp.dest('./build'))
    .pipe(hawkjs())
    //.pipe(gulp.dest('./build'))
    .pipe(hawkcss())
    //.pipe(gulp.dest('./build'))
    .pipe(hawkRename({"changeName":abc.online_host}))
    //.pipe(gulp.dest('./build'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'));

    //hawk_combo.start();

});

gulp.task("md564",['publishinclude64'],function(){
  return gulp.start(['cssmd5','jsmd5','imgmd5','modsjsmd5']);
});

gulp.task("md5",['publishinclude'],function(){
  return gulp.start(['cssmd5','jsmd5','imgmd5','modsjsmd5']);
});

// gulp.task('online64',function () {
//   return gulp.start('md564');
// });
// gulp.task('online',['clean'],function () {
//   return gulp.start('md5');
// });



gulp.task('css', function() {
  return gulp.src('./src/**/*.css')
    .pipe(gulp.dest('./build'));

});


gulp.task('spritecssmin', function() {
  return gulp.src('./build/common/icon/sprite.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./build/common/icon'));

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

gulp.task("dev",["include",'css','hawksprite','images'], function () {


/**
 * 服务器开启提示
 */

 console.log('\n');
 var mock_online_address_temp = mock_online_address.substr(1,mock_online_address.length);
 console.log(
    chalk.blue("服务器开始运行 ")+chalk.cyan('复制根目录地址访问：')+chalk.bgRed("http://"+local_host+mock_online_address)+'\n'+  
    chalk.blue('combo功能示例^_^：') + chalk.bgRed("http://"+local_host+'/'+ mock_online_address_temp+'??' + 'pages/page1/page1.js,'+'pages/page2/page2.js')+'\n'+
    chalk.blue('关闭按：')+chalk.green('ctrl+c\n')+
    chalk.blue('配置文件在根目录：')+chalk.green('abc.json')+'\n\n'
 );

    // gulp.src(["./build/**/*.js"])
    //    // .pipe(uglify())
    //     .pipe(gulp.dest("./build"));

        hawk_combo.start();

  gulp.start('watch');        
});




gulp.task("dev64",["include",'css','sprite64','images'], function () {


/**
 * 服务器开启提示
 */

 console.log('\n');
 var mock_online_address_temp = mock_online_address.substr(1,mock_online_address.length);
 console.log(

    chalk.blue("服务器开始运行 ")+chalk.cyan('复制根目录地址访问：')+chalk.bgRed("http://"+local_host+mock_online_address)+'\n'+  
    chalk.blue('combo功能示例^_^：') + chalk.bgRed("http://"+local_host+ '/'+ mock_online_address_temp+'??' + 'pages/page1/page1.js,'+'pages/page2/page2.js')+'\n'+
    chalk.blue('关闭按：')+chalk.green('ctrl+c\n')+
    chalk.blue('配置文件在根目录：')+chalk.green('abc.json')+'\n'+
    chalk.blue('abc.json配置文件：\n')
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


  gulpSequence = require('gulp-sequence');



gulp.task('online', function (cb) {
   //gulpSequence('clean','cssmin','jsmin','publishinclude','hawksprite','spritecssmin','cssmd5','jsmd5','imgmd5','publish',cb);
   gulpSequence('clean','include1','images','hawksprite','cssmin','jsmin','spritecssmin','cssmd5','jsmd5','imgmd5','copyhtml','cleanhtml','important','publish','msg',cb);
});

gulp.task('onlinedebug', function (cb) {
   //gulpSequence('clean','cssmin','jsmin','publishinclude','hawksprite','spritecssmin','cssmd5','jsmd5','imgmd5','publish',cb);
   gulpSequence('clean','include1','images','hawksprite','cssmin','jsmin','spritecssmin','cssmd5','jsmd5','imgmd5',cb);
});

gulp.task('online64', function (cb) {
   //gulpSequence('clean','cssmin','jsmin','publishinclude','hawksprite','spritecssmin','cssmd5','jsmd5','imgmd5','publish',cb);
   gulpSequence('clean','include1','images','hawksprite','onlineSprite64','cssmin','jsmin','spritecssmin','cssmd5','jsmd5','imgmd5','copyhtml','cleanhtml','important','publish','msg',cb);
});

gulp.task('online64debug', function (cb) {
   //gulpSequence('clean','cssmin','jsmin','publishinclude','hawksprite','spritecssmin','cssmd5','jsmd5','imgmd5','publish',cb);
   gulpSequence('clean','include1','images','hawksprite','onlineSprite64','cssmin','jsmin','spritecssmin','cssmd5','jsmd5','imgmd5',cb);
});


gulp.task('qa', function (cb) {
   //gulpSequence('clean','cssmin','jsmin','publishinclude','hawksprite','spritecssmin','cssmd5','jsmd5','imgmd5','publish',cb);
   gulpSequence('clean','qainclude','images','hawksprite','spritecssmin','importantqa','publishqa','msgqa',cb);
});

gulp.task('qadebug', function (cb) {
   //gulpSequence('clean','cssmin','jsmin','publishinclude','hawksprite','spritecssmin','cssmd5','jsmd5','imgmd5','publish',cb);
   gulpSequence('clean','qainclude','images','hawksprite','spritecssmin',cb);
});

gulp.task('qa64', function (cb) {
   //gulpSequence('clean','cssmin','jsmin','publishinclude','hawksprite','spritecssmin','cssmd5','jsmd5','imgmd5','publish',cb);
   gulpSequence('clean','qainclude','images','hawksprite','onlineSprite64','spritecssmin','importantqa','publishqa','msgqa',cb);
});
gulp.task('qa64debug', function (cb) {
   //gulpSequence('clean','cssmin','jsmin','publishinclude','hawksprite','spritecssmin','cssmd5','jsmd5','imgmd5','publish',cb);
   gulpSequence('clean','qainclude','images','hawksprite','onlineSprite64','spritecssmin',cb);
});

//qainclude


// watch = require('gulp-watch');
 
// gulp.task('stream', function () {
//     return gulp.src('./src/**/*.css')
//         .pipe(watch('./src/**/*.css'))
//         .pipe(gulp.dest('./build'));
// });
 
// gulp.task('callback', function (cb) {
//     watch('css/**/*.css', function () {
//         gulp.src('css/**/*.css')
//             .pipe(watch('css/**/*.css'))
//             .on('end', cb);
//     });
// });


gulp.task('images', function() {
 return gulp.src(['./src/**/*.png','!./src/common/**/*.png'])
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('./build'));
});

 

gulp.task('livereload', function() {
  gulp.src('./build/**/*.*')
    .pipe(livereload());
});

// gulp.task('watch', function() {
//   livereload.listen(); //要在这里调用listen()方法
//   gulp.watch('less/*.less', ['less']);
// });


gulp.task('watch', function() {
 // livereload.listen();

  //var server = livereload();

  gulp.watch('./src/**/*.css', ['include']);

  gulp.watch('./src/**/*.js', ['include','js']);

  gulp.watch('./src/**/*.png', ['images']);
  gulp.watch('./src/**/*.html',['include']);

  // 建立即时重整伺服器
  // var server = livereload;

  // //console.log(server);
 
  // // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
  gulp.watch(['./build/**']).on('change', function(file) {
    livereload.changed(file.path);
  });

//gulp.watch(['./build/**/*.*']).on('change', livereload.changed);


  livereload.listen();
 // livereload.listen();
 // //  // Watch any files in assets/, reload on change
    gulp.watch(['./build/**/*']).on('change', livereload.changed);
});

var yuidoc = require("gulp-yuidoc");

gulp.task('doc', function () {
  return gulp.src("./src/**/*.js")
    .pipe(yuidoc())
    .pipe(gulp.dest("./doc"));
});
