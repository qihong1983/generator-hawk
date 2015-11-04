/**
 * 这个是一个 <%= name %> 模块
 * @module <%= name %>
 * @requires qihong-test-ll
 */

define(function (require, exports, module) {

	"use strict"
	
	var Widget1 = require('widgets/qihong-test-ll/qihong-test-ll');
	/**
	 * @class <%= name %>
	 * @constructor
	 * @param opt {object} 参数
	 */
	function <%= name %>(opt) {
        if (!(this instanceof <%= name %>)) {
            return new <%= name %>(opt);
        }
	}

	<%= name %>.prototype = {
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


	module.exports = <%= name %>;
});