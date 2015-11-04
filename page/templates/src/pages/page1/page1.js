/**
 * 这个是一个 <%= name %> 模块
 * @module <%= name %>
 */

define(function (require, exports, module) {

	"use strict"

	/**
	 * @class <%= name %>
	 * @constructor
	 * @param opt {object} 参数
	 */
	function <%= name %>(opt) {
        if (!(this instanceof <%= name %>)) {
            return new <%= name %>(opt);
        }
        /**
         * 这是一个变量,类型是String
	     * @property name
	     * @type String
	     */
        this.name = '<%= name %>';
	}

	<%= name %>.prototype = {
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
			console.log('rander <%= name %>');
		}
	};

	module.exports = <%= name %>;
	
});