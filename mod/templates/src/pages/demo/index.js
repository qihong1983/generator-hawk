define(function(require, exports, module) {
  var $ = require('$');
  var sayHello = require('../../mods/demo/index');
  $('#say').click(function(e) {
    e.preventDefault();
    sayHello();
  });
});