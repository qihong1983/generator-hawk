'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var fs = require('fs');  
//var yosay = require('yosay');
var chalk = require('chalk');


var ItvGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      // if (!this.options['skip-install']) {
      //   this.installDependencies();
      // }
        var cb = this.async();

        // this.prompt([
        //   {
        //     name   : 'npm_install',
        //     message: '现在是否要按装gulp所需要的模块?',
        //     default: 'N/y',
        //     warning: ''
        //   }
        // ], function (props, err) {

        //   if (err) {

        //     return this.emit('error', err);
        //   }


        //   this.npm_install = (/^y/i).test(props.npm_install);


        //   if (this.npm_install) {
        //     this.npmInstall('', {}, function (err) {

        //       if (err) {
        //         return console.log('\n' + chalk.yellow('please run "sudo npm install"\n'));
        //       }

        //       console.log(chalk.green('\n\nnpm was installed successful. \n\n'));
        //     });
        //   } else {
        //     console.log(chalk.yellow('\n\nplease run "npm install" or "tnpm install" before grunt\n'));
        //     console.log(chalk.green('\ndone!\n'));
        //   }
        // //  cb();
        // }.bind(this));



    });
  },

  askFor: function () {
    var done = this.async();

 
var defaultGreeting = 
  chalk.red(" __                             __") + '\n' +
  chalk.yellow("/\\ \\                           /\\ \\") + '\n' +
  chalk.green("\\ \\ \\___      __     __  __  __\\ \\ \\/'\\") + '\n' +
  chalk.cyan(" \\ \\  _ `\\  /'__`\\  /\\ \\/\\ \\/\\ \\\\ \\ , <") + '\n' +
  chalk.gray("  \\ \\ \\ \\ \\/\\ \\L\\.\\_\\ \\ \\_/ \\_/ \\\\ \\ \\\\`\\") + '\n' +
  chalk.white("   \\ \\_\\ \\_\\ \\__/.\\_\\\\ \\___x___/' \\ \\_\\ \\_\\") + '\n' +
  chalk.blue("    \\\/_/\\/_/\\/__/\\/_/ \\/__//__/    \\/_/\\/_/")+' '+chalk.white('版本:'+this.pkg.version) + '\n\n\n'+
  chalk.cyan('使用帮助')+' ==> '+chalk.bgRed(chalk.white('yo hawk:help')) +'  ' +chalk.yellow('`(*∩_∩*)′ ')+ '\n\n'+
  chalk.cyan('取消请按')+' ==> '+chalk.bgRed(chalk.white('ctrl+c '))+' '+ chalk.yellow('…(⊙_⊙;)…') + '\n\n'+
  chalk.cyan('___________________________________________________________________\n\n') +
  chalk.green('创建项目：') + '\n\n';

    this.log(defaultGreeting);

    //this.copy('src/config.js','../../../src/config.js');
   

/*
  this.log(yosay(' Welcome'));
*/  



    var prompts = [{
      // type: 'confirm',
      // name: 'someOption',
      // message: 'Would you like to enable this option?',
      // default: true
      name: 'name',
      message: '项目名称',
      default: 'hawk_demo'
    },{
      name: 'version',
      message: '项目版本',
      default:'0.1.0' 
    },{
      name: 'group',
      message: '项目组',
      default: 'group'
    },{
      name: 'author',
      message: '开发者',
      default:'hawk' 
    },{
      name: 'email',
      message: '开发者邮箱',
      default:'hawk@hawk.cn'
    },/*{
      name: 'mock_online_address',
      message: '模拟路径(建议不要用默认的, 注意==>两边要有协杠)',
      default:'/assets/group/project/0.1.0/'
    }{
      name: 'project',
      message: '项目',
      default: 'project'
    },*/{
      name: 'online_host',
      message: '备用域名host(建议不要用默认的)',
      default:'xxx1.cdn.cn'
    },/*{
      name: 'online_post',
      message: '线上端口(建议用默认的)',
      default:'80'
    },*/{
      name: 'local_host',
      message: '访问域名host(建议不要用默认的,需要绑hosts)',
      default:'xxx.cdn.cn'
    },/*{
      name: 'local_port',
      message: '本地端口(建议不要用默认的)',
      default:'80'
    },{
      name: 'qa_host',
      message: '测试域名(建议不要用默认的)',
      default:'statics.baidu.com'
    },{
      name: 'qa_port',
      message: '测试域名(建议不要用默认的)',
      default:'8000'
    },*/{
      name: 'ftp_online_root',
      message: chalk.cyan('线上ftp根目录到站点根目录')+chalk.bgRed('(建议不要用默认的,末尾不要用/。如果是根目录直接打/)'),
      default:'/var/www/html'
    },{
      name: 'ftp_qa_root',
      message: chalk.cyan('测试ftp根目录到站点根目录')+chalk.bgRed('(建议不要用默认的,末尾不要用/。如果是根目录直接打/)'),
      default:'/var/www/html'
    },{
      name: 'init_demo',
      message: '是否初始化demo',
      default:'Y/n'
    },{
      name: 'npm_bower',
      message: '是否按装通用组件库?',
      default: 'Y/n',
      warning: ''
     
    },{
      name: 'npm_install',
      message: '是否按装hawk所需gulp插件?',
      default: 'Y/n',
      warning: ''
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;
this.npm_install = (/^y/i).test(props.npm_install);
      this.name = props.name;
      this.version = props.version;
      this.author = props.author;
      this.email = props.email;
      //this.mock_online_address = props.mock_online_address;

      this.mock_online_address = '/a/'+props.group+'/'+props.name+'/' + props.version + '/';
      this.online_host = props.online_host;
      this.online_port = props.online_port;
      this.local_host = props.local_host;
      this.local_port = props.local_port;
      this.qa_host = props.qa_host;
      this.qa_port = props.qa_port;
      this.ftp_online_root = props.ftp_online_root;
      this.ftp_qa_root = props.ftp_qa_root;
      this.init_demo = (/^y/i).test(props.init_demo);
      //console.log(this.someOption);



        //  this.prompt([
        //   {
        //     name   : 'npm_bower',
        //     message: '现在是否要按装bower通用库?',
        //     default: 'N/y',
        //     warning: ''
        //   }
        // ], function (props, err) {

          // if (err) {

          //   return this.emit('error', err);
          // }


          this.npm_bower = (/^y/i).test(props.npm_bower);





        //  cb();
      //  }.bind(this));



      done();
    }.bind(this));
  },

  app: function () {
    this.copy('src/config.js','src/config.js');
    if (this.init_demo) {
          
          //模块demo1
          this.copy('src/mods/mod1/mod1.html','src/mods/mod1/mod1.html');
          this.copy('src/mods/mod1/mod1.css','src/mods/mod1/mod1.css');
          this.copy('src/mods/mod1/mod1.js','src/mods/mod1/mod1.js');
          this.copy('src/mods/mod1/demo.html','src/mods/mod1/demo.html');
          this.mkdir('src/mods/mod1/imgs');
          this.copy('src/mods/mod1/imgs/test.png','src/mods/mod1/imgs/test.png');

          //模块demo2
          this.copy('src/mods/mod2/mod2.html','src/mods/mod2/mod2.html');
          this.copy('src/mods/mod2/mod2.css','src/mods/mod2/mod2.css');
          this.copy('src/mods/mod2/mod2.js','src/mods/mod2/mod2.js');
          this.copy('src/mods/mod2/demo.html','src/mods/mod2/demo.html');
          this.mkdir('src/mods/demo/imgs');

          //页面demo1
          this.template('src/pages/page1/page1.html','src/pages/page1/page1.html');
          this.copy('src/pages/page1/page1.css','src/pages/page1/page1.css');
          this.copy('src/pages/page1/page1.js','src/pages/page1/page1.js');
          this.mkdir('src/mods/page1/img');

          //页面demo2
          this.copy('src/pages/page2/page2.html','src/pages/page2/page2.html');
          this.copy('src/pages/page2/page2.css','src/pages/page2/page2.css');
          this.copy('src/pages/page2/page2.js','src/pages/page2/page2.js');
          this.mkdir('src/mods/demo/img');
    } else {
      this.mkdir('src/pages');
      this.mkdir('src/mods');
      this.mkdir('src/widgets');
    }

    this.mkdir('src/common/icon/');
    this.copy('src/common/sprite.html','src/common/sprite.html');
    this.copy('src/common/icon/sprite.css','build/common/icon/sprite.css');

   this.mkdir('build');
    

    this.template('_abc.json','abc.json');
    //this.copy('_package.json', 'package.json');
    this.template('_package.json','package.json');
    //this.copy('_bower.json', 'bower.json');
          if (this.npm_bower) {
            this.bowerInstall('', {}, function (err) {

              if (err) {
                return console.log('\n' + chalk.yellow('please run "sudo bower install"\n'));
              }

              console.log(chalk.green('\n\nbower was installed successful. \n\n'));
            });
          } else {
            console.log(chalk.yellow('\n手动安装bower install\n'));
          }





         // this.npm_install = (/^y/i).test(props.npm_install);


          if (this.npm_install) {
            this.npmInstall('', {}, function (err) {

              if (err) {
                return console.log('\n' + chalk.yellow('please run "sudo npm install"\n'));
              }

              console.log(chalk.green('\n\nnpm was installed successful. \n\n'));
            });
          } else {
            console.log(chalk.yellow('首动安装npm install\n'));
          }




  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');

    this.copy('_bower.json', '.bower.json');
    this.copy('_gitignore', '.gitignore')
    this.copy('gulpfile.js','gulpfile.js');
  }
});

module.exports = ItvGenerator;

