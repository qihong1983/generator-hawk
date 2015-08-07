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
  var defaultGreeting = 
    chalk.red('\n    _   _____   _     _  ') +
    chalk.red('\n   | | |_   _| | |   / / ') +
    chalk.yellow('\n   | |   | |   | |  / / ') +
    chalk.green('\n   | |   | |   | | / /') +
    chalk.cyan('\n   | |   | |   | |/ / ') + 
    chalk.blue('\n   |_|   |_|   |___/ ') + chalk.yellow('     create widget') +  '\n' +
    chalk.cyan('\n______________________________________________________________________\n\n\n');


    this.log(defaultGreeting);

 
   

/*
  this.log(yosay(' Welcome'));
*/  



    var prompts = [{
      // type: 'confirm',
      // name: 'someOption',
      // message: 'Would you like to enable this option?',
      // default: true
      name: 'name',
      message: '创建组件',
      default: 'demo'
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      this.name = props.name;

      //console.log(this.someOption);
      done();
    }.bind(this));
  },

  app: function () {

     this.template('src/widgets/demo/demo.js','src/widgets/'+this.name+'/'+this.name+'.js');
    

  },

  projectfiles: function () {

  }
});

module.exports = ItvGenerator;
