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
  chalk.green('创建页面：') + '\n\n';

  console.log('\n');

    this.log(defaultGreeting);

    // this.copy('src/config.js','../../../src/config.js');
   
    var prompts = [{
      // type: 'confirm',
      // name: 'someOption',
      // message: 'Would you like to enable this option?',
      // default: true
      name: 'name',
      message: '页面名称',
      default: 'page'
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      this.name = props.name;
      var abc = fs.readFileSync('./abc.json','utf-8');
      abc = JSON.parse(abc);
      this.mock_online_address = abc.mock_online_address;
      this.online_host = abc.online_host;
      this.online_port = abc.online_port;
      this.local_host = abc.local_host;
      this.local_port = abc.local_port;
      this.qa_host = abc.qa_host;
      this.qa_port = abc.qa_port;



      //console.log(this.someOption);
      done();
    }.bind(this));
  },

  app: function () {
    

    this.template('src/pages/page1/page1.html','src/pages/'+this.name+'/'+this.name+'.html');
    this.template('src/pages/page1/page1.css','src/pages/'+this.name+'/'+this.name+'.css');
    this.template('src/pages/page1/page1.js','src/pages/'+this.name+'/'+this.name+'.js');
    this.mkdir('src/pages/'+this.name+'/imgs');
    
  },

  projectfiles: function () {

  }
});

module.exports = ItvGenerator;
