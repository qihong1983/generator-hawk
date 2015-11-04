/**
 * 这个是一个 page1 模块
 * @module page1
 */

define(function (require, exports, module) {

	"use strict"

	/**
	 * @class page1
	 * @constructor
	 * @param opt {object} 参数
	 */
	function Page1(opt) {
        if (!(this instanceof Page1)) {
            return new Page1(opt);
        }
        /**
         * 这是一个变量,类型是String
	     * @property name
	     * @type String
	     */
	     this.name = '<%= name %>';
	}

	Page1.prototype = {
		/**
		 * 这个初始化
		 * @method init
		 */
		init: function () {
			console.log('init' + this.name);

			/**
			 * @method init
			 * @static
			 */
			var statics = {};
		},
		/**
		 * 渲染操作
		 * @method rander
		 */
		rander: function () {
			console.log('rander page1');
		}
	};

	module.exports = Page1;
	
});