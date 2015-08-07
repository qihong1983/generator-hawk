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
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();
 
    // Have Yeoman greet the user.
    //this.log(yosay('Welcome to the marvelous Itv generator!'));
  // var defaultGreeting = 
  //   chalk.red('\n    _   _____   _     _  ') +
  //   chalk.red('\n   | | |_   _| | |   / / ') +
  //   chalk.yellow('\n   | |   | |   | |  / / ') +
  //   chalk.green('\n   | |   | |   | | / /') +
  //   chalk.cyan('\n   | |   | |   | |/ / ') + 
  //   chalk.blue('\n   |_|   |_|   |___/ ') + chalk.yellow('     v') + chalk.yellow(this.pkg.version) + '\n' +
  //   chalk.cyan('\n______________________________________________________________________\n\n\n');




var defaultGreeting = 
  chalk.red(" __                             __") + '\n' +
  chalk.yellow("/\\ \\                           /\\ \\") + '\n' +
  chalk.green("\\ \\ \\___      __     __  __  __\\ \\ \\/'\\") + '\n' +
  chalk.cyan(" \\ \\  _ `\\  /'__`\\  /\\ \\/\\ \\/\\ \\\\ \\ , <") + '\n' +
  chalk.gray("  \\ \\ \\ \\ \\/\\ \\L\\.\\_\\ \\ \\_/ \\_/ \\\\ \\ \\\\`\\") + '\n' +
  chalk.white("   \\ \\_\\ \\_\\ \\__/.\\_\\\\ \\___x___/' \\ \\_\\ \\_\\") + '\n' +
  chalk.blue("    \\\/_/\\/_/\\/__/\\/_/ \\/__//__/    \\/_/\\/_/")+' '+chalk.bgWhite(chalk.black('创建项目'+this.pkg.version)) + '\n\n\n';
  console.log('\n');

    this.log(defaultGreeting);

    this.copy('src/config.js','../../../src/config.js');
   

/*
  this.log(yosay(' Welcome'));
*/  



    var prompts = [{
      // type: 'confirm',
      // name: 'someOption',
      // message: 'Would you like to enable this option?',
      // default: true
      name: 'name',
      message: 'Name of Project',
      default: 'hawk_demo'
    },{
      name: 'version',
      message: 'Version',
      default:'0.0.1' 
    },{
      name: 'author',
      message: 'Author Name',
      default:'hawk' 
    },{
      name: 'email',
      message: 'Author Email',
      default:'hawk@hawk.cn'
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      this.name = props.name;
      this.version = props.version;
      this.author = props.author;
      this.email = props.email;
      //console.log(this.someOption);
      done();
    }.bind(this));
  },

  app: function () {
    
 
    this.copy('build/jquery/jquery/2.1.0/jquery.js','build/jquery/jquery/2.1.0/jquery.js');
    this.copy('build/jquery/jquery/2.1.0/jquery-debug.js','build/jquery/jquery/2.1.0/jquery-debug.js');
    this.copy('build/jquery/jquery/2.1.0/package.json','build/jquery/jquery/2.1.0/package.json');

    this.copy('build/seajs/seajs/2.2.1/sea.js','build/seajs/seajs/2.2.1/sea.js');
    this.copy('build/seajs/seajs/2.2.1/sea-debug.js','build/seajs/seajs/2.2.1/sea-debug.js');
    this.copy('build/seajs/seajs/2.2.1/package.json','build/seajs/seajs/2.2.1/package.json');

    this.copy('src/config.js','src/config.js');

    this.copy('src/mods/demo/index.html','src/mods/demo/index.html');
    this.copy('src/mods/demo/index.css','src/mods/demo/index.css');
    this.copy('src/mods/demo/index.js','src/mods/demo/index.js');
    this.copy('src/mods/demo/demo.html','src/mods/demo/demo.html');
    this.mkdir('src/mods/demo/img');
    this.mkdir('src/mods/demo/mock');

    this.copy('src/pages/demo/index.html','src/pages/demo/index.html');
    this.copy('src/pages/demo/index.css','src/pages/demo/index.css');
    this.copy('src/pages/demo/index.js','src/pages/demo/index.js');
    this.mkdir('src/mods/demo/img');
    
    //this.copy('_package.json', 'package.json');
    this.template('_package.json','package.json');
    //this.copy('_bower.json', 'bower.json');


  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('Gruntfile.js','Gruntfile.js');
  }
});

module.exports = ItvGenerator;
