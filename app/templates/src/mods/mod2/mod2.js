/**
 * 这个是一个 mod2 模块
 * @module mod2
 * @requires qihong-test-ll1
 */
define(function (require, exports, module) {
	var Widget2 = require('widgets/qihong-test-ll1/qihong-test-ll1');
	
	/**
	 * @class mod2
	 * @constructor
	 * @param opt {object} 参数
	 */
	function Mod2(opt) {
        if (!(this instanceof Mod2)) {
            return new Mod2(opt);
        }
	}
	/**
	 * 这个初始化
	 * @method init
	 */
	Mod2.prototype = {
		init: function () {
			console.log('模块2');
			var aa = new Widget2();
			aa.init();
		}
	};


	module.exports = Mod2;
});