/**
 * 这个是一个 mod1 模块
 * @module mod1
 * @requires qihong-test-ll
 */

define(function (require, exports, module) {

	"use strict"
	
	var Widget1 = require('widgets/qihong-test-ll/qihong-test-ll');
	/**
	 * @class mod1
	 * @constructor
	 * @param opt {object} 参数
	 */
	function Mod1(opt) {
        if (!(this instanceof Mod1)) {
            return new Mod1(opt);
        }
	}

	Mod1.prototype = {
		/**
		 * 这个初始化
		 * @method init
		 */
		init: function () {
			console.log('模块1');
			//console.log(ll.init());

			var ll = new Widget1();
			ll.init(); 
		}
	};


	module.exports = Mod1;
});