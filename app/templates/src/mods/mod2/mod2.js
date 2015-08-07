define(function (require, exports, module) {
		var Widget2 = require('widgets/hawk_bower_test/abcd_bower_test');
	function Mod2(opt) {
        if (!(this instanceof Mod2)) {
            return new Mod2(opt);
        }
	}

	Mod2.prototype = {
		init: function () {
			console.log('模块2');
			var aa = new Widget2();
			aa.init();
		}
	};


	module.exports = Mod2;
});