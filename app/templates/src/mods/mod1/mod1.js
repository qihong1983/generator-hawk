define(function (require, exports, module) {

	var Widget1 = require('widgets/qihong-test-ll/abcd_bower_test');

	function Mod1(opt) {
        if (!(this instanceof Mod1)) {
            return new Mod1(opt);
        }
	}

	Mod1.prototype = {
		init: function () {
			console.log('模块1');
			//console.log(ll.init());

			var ll = new Widget1();
			ll.init(); 
		}
	};


	module.exports = Mod1;
});